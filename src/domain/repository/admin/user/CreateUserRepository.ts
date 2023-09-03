import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import TYPES from 'src/TYPES';
import User from 'src/domain/entity/admin/User';
import CreateBaseRepository from 'src/infrastructure/domain/repository/CreateBaseRepository';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';
import { DataSource, InsertQueryBuilder, QueryRunner } from 'typeorm';

@injectable()
export default class CreateUserRepository extends CreateBaseRepository<User> {

  constructor(
    @inject(TYPES.DBConnectionManager) private dBConnectionManager: DBConnectionManager
  ) {
    super();
  }

  protected async buildQuery(port?: Partial<User> | Partial<User>[]): Promise<InsertQueryBuilder<User>> {
    const connection: DataSource | QueryRunner = await this.dBConnectionManager.getActiveConnection();

    const queryBuilder = connection.manager.createQueryBuilder()
      .insert()
      .into(User)
      .values(port);

    return queryBuilder;
  }
}