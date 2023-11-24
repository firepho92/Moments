import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { v4 as uuidv4 } from 'uuid';
import { inject, injectable } from 'inversify';
import User from 'src/domain/entity/management/User';
import Exception from 'src/utils/error/Exception';
import UserRoles from 'src/utils/enums/UserRoles';
import ErrorCode from 'src/utils/error/errorCode';
import Tenant from 'src/domain/entity/management/Tenant';
import SecretsBase from 'src/utils/aws/SecretsBase';
import Profile from 'src/domain/entity/public/Profile';
import UseCase from 'src/infrastructure/useCase/UseCase';
import HttpStatusCode from 'src/utils/enums/httpStatusCode';
import TenantByUser from 'src/domain/entity/management/TenantByUser';
import DataBaseUser from 'src/domain/entity/management/DataBaseUser';
import CreateSpaceDto from 'src/domain/dto/management/CreateSpaceDto';
import FindQueryDTO from 'src/infrastructure/domain/dto/FindQueryDTO';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';
import Repository from 'src/infrastructure/domain/repository/Repository';
import CreateManagementDto from 'src/domain/dto/management/CreateManagementDto';
import CreateBaseRepository from 'src/infrastructure/domain/repository/CreateBaseRepository';
import FindOneBaseRepository from 'src/infrastructure/domain/repository/FindOneBaseRepository';

@injectable()
export default class CreateManagementUseCase implements UseCase<CreateSpaceDto, Promise<TenantByUser>> {
  constructor(
    @inject(TYPES.DBConnectionManager) private readonly dBConnectionManager: DBConnectionManager,
    @inject(TYPES.CreateUserRepository) private readonly createUserRepository: CreateBaseRepository<User>,
    @inject(TYPES.CreateTenantRepository) private readonly createTenantRepository: CreateBaseRepository<Tenant>,
    @inject(TYPES.CreateTenantByUserRepository) private readonly createTenantByUserRepository: CreateBaseRepository<TenantByUser>,
    @inject(TYPES.FindOneProfileRepository) private readonly findOneProfileRepository: FindOneBaseRepository<FindQueryDTO, Profile>,
    @inject(TYPES.CreateManagementDBStructureRepository) private readonly createManagementDBStructureRepository: Repository<CreateManagementDto, Promise<void>>,
    @inject(TYPES.SecretsManager) private readonly secretsManager: SecretsBase,
  ) {}

  async execute(port?: CreateSpaceDto): Promise<TenantByUser> {
    console.log('CreateMomentSpaceUseCase port', port);
    await this.dBConnectionManager.connect();

    let profile: Profile;
    try {
      profile = await this.findOneProfileRepository.execute(port.user);
      console.log('CreateMomentSpaceUseCase profile', profile);
    } catch (error) {
      throw new Exception(HttpStatusCode.NOT_FOUND, ErrorCode.NOT_FOUND)
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

      const tenant = new Tenant(port.space);

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
