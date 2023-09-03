import 'reflect-metadata';
import TYPES from '../../../../src/TYPES';
import Couple from '../domain/entity/Couple';
import { inject, injectable } from 'inversify';
import UseCase from '../../../infrastructure/useCase/UseCase';
import Repository from '../../../infrastructure/domain/repository/Repository';
import PaginationQueryDTO from '../../../infrastructure/domain/dto/PaginationQueryDTO';
import FindManyPaginatedBaseRepositoryParams from '../../../infrastructure/domain/repository/FindManyPaginatedBaseRepositoryParams';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';

@injectable()
export default class ApiGatewayGetUseCase implements UseCase<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryParams<Couple>>> {
  constructor(
    @inject(TYPES.DBConnectionManager) private dbConnectionManager: DBConnectionManager,
    @inject(TYPES.CoupleFindPaginatedRepository) private coupleFindPaginatedRepository: Repository<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryParams<Couple>>>
  ) { }

  async execute(port?: PaginationQueryDTO): Promise<FindManyPaginatedBaseRepositoryParams<Couple>> {
    console.log('ApiGatewayGetUseCase execute', port);
    await this.dbConnectionManager.connect();
    try {
      const items: FindManyPaginatedBaseRepositoryParams<Couple> = await this.coupleFindPaginatedRepository.execute(port);
      return items;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await this.dbConnectionManager.disconnect();
    }
  }
}