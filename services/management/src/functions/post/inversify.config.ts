import TYPES from './TYPES';
import { Container } from 'inversify';
import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import CreateTenantRepository from '../../../../../src/domain/repository/admin/tenant/CreateTenantRepository';
import CreateTenantByUserRepository from '../../../../../src/domain/repository/admin/tenantByUser/CreateTenantByUserRepository';
import CreateManagementDBStructureRepository from '../../../../../src/domain/repository/admin/management/CreateManagementDBStructureRepository';
import CreateUserRepository from '../../../../../src/domain/repository/admin/user/CreateUserRepository';
import FindOneProfileRepository from '../../../../../src/domain/repository/public/profile/FindOneProfileRepository';
import CreateMomentSpaceAdminController1_0_0 from '../../../../../src/modules/management/controller/CreateManagementController/1.0.0/CreateManagementController';
import CreateManagementAdapter from '../../../../../src/modules/management/adapter/CreateManagementAdapter';
import CreateManagementUseCase from '../../../../../src/modules/management/useCase/CreateManagementUseCase';
import APIGatewayResultMapperService from '../../../../../src/infrastructure/domain/mapper/APIGatewayResultMapperService';
import DBConnectionHelperFactory from '../../../../../src/utils/database/DBConnectionHelperFactory';
import DBConnectionManagerTypeORM from '../../../../../src/utils/database/DBConnectionManagerTypeORM';

const container: Container = new Container();

container.bind(Container).toConstantValue(container);
container.bind(TYPES.SecretsManager).to(SecretsManager);
container.bind(TYPES.APIGatewayResultMapperService).to(APIGatewayResultMapperService);
container.bind(TYPES.DBConnectionHelperFactory).to(DBConnectionHelperFactory).inSingletonScope();
container.bind(TYPES.DBConnectionManager).to(DBConnectionManagerTypeORM).inSingletonScope();
container.bind(TYPES.Default).to(CreateMomentSpaceAdminController1_0_0);
container.bind(TYPES['1.0.0']).to(CreateMomentSpaceAdminController1_0_0);
container.bind(TYPES.CreateTenantRepository).to(CreateTenantRepository);
container.bind(TYPES.CreateUserRepository).to(CreateUserRepository);
container.bind(TYPES.CreateTenantByUserRepository).to(CreateTenantByUserRepository);
container.bind(TYPES.CreateManagementUseCase).to(CreateManagementUseCase);
container.bind(TYPES.CreateManagementAdapter).to(CreateManagementAdapter);
container.bind(TYPES.FindOneProfileRepository).to(FindOneProfileRepository);
container.bind(TYPES.CreateManagementDBStructureRepository).to(CreateManagementDBStructureRepository);

export default container;