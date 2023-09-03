import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DataSource, QueryRunner, SelectQueryBuilder } from 'typeorm';
import Profile from 'src/domain/entity/public/Profile';
import FindQueryDTO from 'src/infrastructure/domain/dto/FindQueryDTO';
import FindOneBaseRepository from 'src/infrastructure/domain/repository/FindOneBaseRepository';
import TYPES from 'src/TYPES';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';

@injectable()
export default class FindOneProfileRepository extends FindOneBaseRepository<FindQueryDTO, Profile> {

  constructor(
    @inject(TYPES.DBConnectionManager) private dbConnectionManager: DBConnectionManager,
  ) {
    super();
  }

  protected async buildQuery(port?: FindQueryDTO<{ email: string }>): Promise<SelectQueryBuilder<Profile>> {
    const connection: DataSource | QueryRunner = await this.dbConnectionManager.getActiveConnection();
    const queryBuilder = connection.manager.createQueryBuilder()
      .select('profile')
      .from(Profile, 'profile')
      .where('profile.email = :email', { email: port?.criteria?.email });
    return queryBuilder;
  }
}