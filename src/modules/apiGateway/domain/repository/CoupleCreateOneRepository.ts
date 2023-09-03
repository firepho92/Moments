import 'reflect-metadata';
import TYPES from '../../../../../src/TYPES';
import Couple from '../entity/Couple';
import { inject, injectable } from 'inversify';
import { DataSource, InsertQueryBuilder, QueryRunner } from 'typeorm';
import DBConnectionManager from '../../../../../src/utils/database/DBConnectionManager';
import CreateBaseRepository from '../../../../infrastructure/domain/repository/CreateBaseRepository';

@injectable()
export default class CoupleCreateOneRepository extends CreateBaseRepository<Couple> {

  constructor(
    @inject(TYPES.DBConnectionManager) private dbConnectionManager: DBConnectionManager
  ) {
    super();
  }

  protected async buildQuery(port?: Partial<Couple>): Promise<InsertQueryBuilder<Couple>> {
    const connection: DataSource | QueryRunner = await this.dbConnectionManager.getActiveConnection();

    const queryBuilder = connection.manager.createQueryBuilder()
      .insert()
      .into(Couple)
      .values(port)

    return queryBuilder;
  }
}