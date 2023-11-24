import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import { DataSource, QueryRunner } from 'typeorm';
import Repository from 'src/infrastructure/domain/repository/Repository';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';
import CreateManagementDto from 'src/domain/dto/management/CreateManagementDto';

@injectable()
export default class CreateManagementDBStructureRepository implements Repository<CreateManagementDto, Promise<void>> {
  constructor(
    @inject(TYPES.DBConnectionManager) private readonly dbConnectionManager: DBConnectionManager,
  ) {}

  async execute(port?: CreateManagementDto): Promise<void> {
    const connection: DataSource | QueryRunner = await this.dbConnectionManager.getActiveConnection();

    const query = await connection.query(
      'public.create_management(?, ?, ?)', [port.tenant, port.username, port.password]
    );

    return query;
  }
}