import { inject } from 'inversify';
import 'reflect-metadata';
import TYPES from 'src/TYPES';
import TenantByUser from 'src/domain/entity/admin/TenantByUser';
import CreateBaseRepository from 'src/infrastructure/domain/repository/CreateBaseRepository';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';
import { DataSource, InsertQueryBuilder, QueryRunner } from 'typeorm';


export default class CreateTenantByUserRepository extends CreateBaseRepository<TenantByUser> {
  constructor(
    @inject(TYPES.DBConnectionManager) private dBConnectionManager: DBConnectionManager
  ) {
    super();
  }
  
  protected async buildQuery(port?: Partial<TenantByUser> | Partial<TenantByUser>[]): Promise<InsertQueryBuilder<TenantByUser>> {
    const connection: DataSource | QueryRunner = await this.dBConnectionManager.getActiveConnection();

    const queryBuilder = connection.manager.createQueryBuilder()
      .insert()
      .into(TenantByUser)
      .values(port);

    return queryBuilder;
  }
}