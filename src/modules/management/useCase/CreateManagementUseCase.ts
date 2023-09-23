import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { v4 as uuidv4 } from 'uuid';
import { inject, injectable } from 'inversify';
import User from 'src/domain/entity/admin/User';
import Exception from 'src/utils/error/Exception';
import UserRoles from 'src/utils/enums/UserRoles';
import ErrorCode from 'src/utils/error/errorCode';
import Tenant from 'src/domain/entity/admin/Tenant';
import SecretsBase from 'src/utils/aws/SecretsBase';
import Profile from 'src/domain/entity/public/Profile';
import UseCase from 'src/infrastructure/useCase/UseCase';
import HttpStatusCode from 'src/utils/enums/httpStatusCode';
import TenantByUser from 'src/domain/entity/admin/TenantByUser';
import DataBaseUser from 'src/domain/entity/admin/DataBaseUser';
import CreateSpaceDto from 'src/domain/dto/admin/CreateSpaceDto';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';
import CreateBaseRepository from 'src/infrastructure/domain/repository/CreateBaseRepository';
import FindOneProfileRepository from 'src/domain/repository/public/profile/FindOneProfileRepository';
import CreateManagementDBStructureRepository from 'src/domain/repository/admin/management/CreateManagementDBStructureRepository';

@injectable()
export default class CreateManagementUseCase implements UseCase<CreateSpaceDto, Promise<TenantByUser>> {
  constructor(
    @inject(TYPES.DBConnectionManager) private readonly dBConnectionManager: DBConnectionManager,
    @inject(TYPES.CreateUserRepository) private readonly createUserRepository: CreateBaseRepository<User>,
    @inject(TYPES.CreateTenantRepository) private readonly createTenantRepository: CreateBaseRepository<Tenant>,
    @inject(TYPES.CreateTenantByUserRepository) private readonly createTenantByUserRepository: CreateBaseRepository<TenantByUser>,
    @inject(TYPES.FindOneProfileRepository) private readonly findOneProfileRepository: FindOneProfileRepository,
    @inject(TYPES.CreateManagementDBStructureRepository) private readonly createManagementDBStructureRepository: CreateManagementDBStructureRepository,
    @inject(TYPES.SecretsManager) private readonly secretsManager: SecretsBase,
  ) {}

  async execute(port?: CreateSpaceDto): Promise<TenantByUser> {
    console.log('CreateMomentSpaceUseCase port', port);
    await this.dBConnectionManager.connect();
    let profile: Profile;
    try {
      profile = await this.findOneProfileRepository.execute(port.user);
      console.log('CreateMomentSpaceUseCase profile', profile);
      throw new Exception(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR0001)
    } catch (error) {
      throw new Exception(HttpStatusCode.NOT_FOUND, ErrorCode.ERR0001)
    } finally {
      await this.dBConnectionManager.disconnect();
    }
    // secret creation
    const dataBaseUser = new DataBaseUser(port.user.criteria.email);
    const secretName = uuidv4().toString();
    await this.secretsManager.createSecret(secretName, dataBaseUser);
    const transaction = await this.dBConnectionManager.getTransaction();
    try {
      const profile = await this.findOneProfileRepository.execute(port.user);

      const user = new User(UserRoles.MANAGER, profile.id);

      const tenant = new Tenant({name: port.space});

      const [createdUser, createdTenant] = await Promise.all([await this.createUserRepository.execute(user), await this.createTenantRepository.execute(tenant)]);

      const tenantByUser = new TenantByUser(createdTenant.id, createdUser.id, secretName);

      const createdTenantByUser = await this.createTenantByUserRepository.execute(tenantByUser);
      console.log('CreateMomentSpaceUseCase createdTenantByUser', createdTenantByUser);
      await this.createManagementDBStructureRepository.execute({ username: dataBaseUser.username, password: dataBaseUser.password, tenant: createdTenant.id })
      await transaction.commitTransaction();

      return createdTenantByUser;
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
