import 'reflect-metadata';
import Person from '../entity/Person';
import { inject, injectable } from 'inversify';
import CreateBaseRepository from '../../../../infrastructure/domain/repository/CreateBaseRepository';
import { DataSource, InsertQueryBuilder, QueryRunner } from 'typeorm';
import TYPES from '../../../../../src/TYPES';
import DBConnectionManager from '../../../../../src/utils/database/DBConnectionManager';

@injectable()
export default class PersonCreateOneRepository extends CreateBaseRepository<Person> {

  constructor(
    @inject(TYPES.DBConnectionManager) private dbConnectionManager: DBConnectionManager
  ) {
    super();
  }

  protected async buildQuery(port: Partial<Person> | Person[]): Promise<InsertQueryBuilder<Person>> {
    // console.log('PersonCreateOneRepository buildQuery: ', port)
    const connection: DataSource | QueryRunner = await this.dbConnectionManager.getActiveConnection();

    const queryBuilder = connection.manager.createQueryBuilder()
      .insert()
      .into(Person)
      .values(port)

    return queryBuilder;
  }
}