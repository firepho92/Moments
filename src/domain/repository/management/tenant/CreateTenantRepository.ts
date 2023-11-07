import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import Tenant from 'src/domain/entity/management/Tenant';
import { DataSource, InsertQueryBuilder, QueryRunner } from 'typeorm';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';
import CreateBaseRepository from 'src/infrastructure/domain/repository/CreateBaseRepository';
import Repository from 'src/infrastructure/domain/repository/Repository';

@injectable()
export default class CreateTenantRepository extends CreateBaseRepository<Tenant> implements Repository<Partial<Tenant>, Promise<Tenant>> {
  constructor(
    @inject(TYPES.DBConnectionManager) private dBConnectionManager: DBConnectionManager
  ) {
    super();
  }
  
  protected async buildQuery(port?: Partial<Tenant> | Partial<Tenant>[]): Promise<InsertQueryBuilder<Tenant>> {
    const connection: DataSource | QueryRunner = await this.dBConnectionManager.getActiveConnection();

    const queryBuilder = connection.manager.createQueryBuilder()
      .insert()
      .into(Tenant)
      .values(port);

    return queryBuilder;
  }
  
}