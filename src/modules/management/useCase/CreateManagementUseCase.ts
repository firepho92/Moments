import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import UseCase from 'src/infrastructure/useCase/UseCase';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';
import CreateUserRepository from 'src/domain/repository/admin/user/CreateUserRepository';
import CreateTenantRepository from 'src/domain/repository/admin/tenant/CreateTenantRepository';
import CreateTenantByUserRepository from 'src/domain/repository/admin/tenantByUser/CreateTenantByUserRepository';
import TenantByUser from 'src/domain/entity/admin/TenantByUser';
import FindOneProfileRepository from 'src/domain/repository/public/profile/FindOneProfileRepository';
import Profile from 'src/domain/entity/public/Profile';
import Exception from 'src/utils/error/Exception';
import HttpStatusCode from 'src/utils/enums/httpStatusCode';
import ErrorCode from 'src/utils/error/errorCode';
import User from 'src/domain/entity/admin/User';
import FindQueryDTO from 'src/infrastructure/domain/dto/FindQueryDTO';
import Tenant from 'src/domain/entity/admin/Tenant';
import { v4 as uuidv4 } from 'uuid';
import UserRoles from 'src/utils/enums/UserRoles';
import CreateManagementDBStructureRepository from 'src/domain/repository/admin/management/CreateManagementDBStructureRepository';
import generator from 'generate-password';

@injectable()
export default class CreateManagementUseCase implements UseCase<any, Promise<TenantByUser>> {
  constructor(
    @inject(TYPES.DBConnectionManager) private readonly dBConnectionManager: DBConnectionManager,
    @inject(TYPES.CreateUserRepository) private readonly createUserRepository: CreateUserRepository,
    @inject(TYPES.CreateTenantRepository) private readonly createTenantRepository: CreateTenantRepository,
    @inject(TYPES.CreateTenantByUserRepository) private readonly createTenantByUserRepository: CreateTenantByUserRepository,
    @inject(TYPES.FindOneProfileRepository) private readonly findOneProfileRepository: FindOneProfileRepository,
    @inject(TYPES.CreateManagementDBStructureRepository) private readonly createManagementDBStructureRepository: CreateManagementDBStructureRepository,
  ) {}

  async execute(port?: FindQueryDTO<{ email: string }>): Promise<TenantByUser> {
    console.log('CreateMomentSpaceUseCase port', port);
    await this.dBConnectionManager.connect();
    let profile: Profile;
    try {
      profile = await this.findOneProfileRepository.execute(port);
      console.log('CreateMomentSpaceUseCase profile', profile);
      throw new Exception(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR0001)
    } catch (error) {
      throw new Exception(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR0001)
    } finally {
      await this.dBConnectionManager.disconnect();
    }
    // secret creation
    const transaction = await this.dBConnectionManager.getTransaction();
    try {
      const user = new User(UserRoles.MANAGER, profile.id);
      const tenant = new Tenant(uuidv4().toString());
      const [createdUser, createdTenant] = await Promise.all([await this.createUserRepository.execute(user), await this.createTenantRepository.execute(tenant)]);
      console.log('CreateMomentSpaceUseCase createdUser', createdUser);
      console.log('CreateMomentSpaceUseCase createdTenant', createdTenant);
      const tenantByUser = new TenantByUser(createdTenant.id, createdUser.id);
      const createdTenantByUser = await this.createTenantByUserRepository.execute(tenantByUser);
      console.log('CreateMomentSpaceUseCase createdTenantByUser', createdTenantByUser);
      await this.createManagementDBStructureRepository.execute({ username: profile.email, password: generator.generate({ length: 10, numbers: true, symbols: true }), tenant: createdTenant.name })
      await transaction.commitTransaction();

      return tenantByUser;
    } catch (error) {
      console.log('CreateMomentSpaceUseCase error', error);
      await transaction.rollbackTransaction();
      throw error;
    } finally {
      await this.dBConnectionManager.endTransaction();
      await this.dBConnectionManager.disconnect();
    }
  }
}
