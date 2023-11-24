import 'reflect-metadata';
import Repository from './Repository';
import { injectable } from 'inversify';
import Warning from 'src/utils/error/Warning';
import Exception from 'src/utils/error/Exception';
import ErrorCode from 'src/utils/error/errorCode';
import HttpStatusCode from 'src/utils/enums/httpStatusCode';
import { EntityNotFoundError, SelectQueryBuilder } from 'typeorm';
import PostgresSQLErrorCodes from 'src/utils/enums/postgresSQLErrorCodes';

//const logger = LoggerFactory.getInstance();

/**
 * @class FindOneBaseRepository
 * @template T
 * @implements Repository<T, Promise<U>>
 * @description Base repository class
 * @author Daniel Campos
 * @created 2022-07-27
 * @updated 2022-10-14
 * @updatedBy Alexandro Aguilar
 */
@injectable()
export default abstract class FindOneBaseRepository<InputParams, Result> implements Repository<InputParams, Promise<Result>> {

  protected abstract buildQuery(port?: InputParams): Promise<SelectQueryBuilder<Result>>;
  /**
   * @function execute
   * @returns Promise<T[], number>
   * @throws {Exception | Warning}
   * @description Finds all items paginated
   * @belongsTo Repository
   */
  async execute(port?: InputParams): Promise<Result> {
    try {
      const query = await this.buildQuery(port) as SelectQueryBuilder<Result>;
      const result = await query.getOneOrFail();
      return result;
    } catch (error) {
      console.error('FindOneBaseRepository error', error);
      if (error.code === PostgresSQLErrorCodes.FOREIGN_KEY_VIOLATION)
        throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.NOT_FOUND);
      if (error.code === PostgresSQLErrorCodes.INVALID_TEXT_REPRESENTATI)
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.BAD_REQUEST);
      if (error instanceof EntityNotFoundError) throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.NOT_FOUND);

      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.INTERNAL_SERVER_ERROR, []);
    }
  }
}