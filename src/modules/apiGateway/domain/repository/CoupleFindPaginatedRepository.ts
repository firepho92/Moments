import 'reflect-metadata';
import TYPES from '../../../../../src/TYPES';
import Couple from '../entity/Couple';
import { injectable, inject } from 'inversify';
import { DataSource, QueryRunner, SelectQueryBuilder } from 'typeorm';
import Repository from 'src/modules/infrastructure/domain/repository/Repository';
import DBConnectionManager from '../../../../../src/utils/database/DBConnectionManager';
import PaginationQueryDTO from '../../../../../src/modules/infrastructure/domain/dto/PaginationQueryDTO';
import FindManyPaginateBaseRepository from '../../../../../src/modules/infrastructure/domain/repository/FindManyPaginateBaseRepository';
import FindManyPaginatedBaseRepositoryParams from '../../../../../src/modules/infrastructure/domain/repository/FindManyPaginatedBaseRepositoryParams';

@injectable()
export default class CoupleFindPaginatedRepository extends FindManyPaginateBaseRepository<Couple> implements Repository<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryParams<Couple>>> {
  constructor(
    @inject(TYPES.DBConnectionManager) private dbConnectionManager: DBConnectionManager
    ) {
      super();
    }
    
    protected async buildQuery(port?: PaginationQueryDTO): Promise<SelectQueryBuilder<Couple>> {
      // console.log('CoupleFindPaginatedRepository buildQuery', port);
      const connection: DataSource | QueryRunner = await this.dbConnectionManager.getActiveConnection();
      const queryBuilder = connection.manager.createQueryBuilder()
        .select('couple')
        .from(Couple, 'couple')
        .innerJoinAndSelect('couple.principal', 'principal')
        .innerJoinAndSelect('couple.companion', 'companion')
        .where('couple.active = :active', { active: true })
        if (port.order)
          queryBuilder.orderBy(`couple.${port.order.field}`, port.order.direction);
      return queryBuilder;
    }
}