import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import Repository from 'src/infrastructure/domain/repository/Repository';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';

@injectable()
export default class CreateManagementDBStructureRepository implements Repository<any, Promise<void>> {
  constructor(
    @inject(TYPES.DBConnectionManager) private readonly dbConnectionManager: DBConnectionManager,
  ) {}

  async execute(port?: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}