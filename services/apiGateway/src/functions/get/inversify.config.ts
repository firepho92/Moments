import { Container } from 'inversify';
import TYPES from './TYPES';
import UseCase from '../../../../../src/modules/infrastructure/useCase/UseCase';
import Couple from '../../../../../src/modules/apiGateway/domain/entity/Couple';
import DBConnectionManager from '../../../../../src/utils/database/DBConnectionManager';
import PaginationQueryDTO from '../../../../../src/modules/infrastructure/domain/dto/PaginationQueryDTO';
import ApiGatewayGetAdapter from '../../../../../src/modules/apiGateway/adapter/ApiGatewayGetAdapter';
import CoupleDto from '../../../../../src/modules/apiGateway/domain/dto/CoupleDto';
import BaseMapper from '../../../../../src/modules/infrastructure/domain/mapper/BaseMapper';
import CoupleMapper from '../../../../../src/modules/apiGateway/domain/mapper/CoupleMapper';
import ApiGatewayGetUseCase from '../../../../../src/modules/apiGateway/useCase/ApiGatewayGetUseCase';
import DBConnectionManagerTypeORM from '../../../../../src/utils/database/DBConnectionManagerTypeORM';
import PaginationResponseDTO from '../../../../../src/modules/infrastructure/domain/dto/PaginationResponseDTO';
import PaginationMapperParams from '../../../../../src/modules/infrastructure/domain/dto/PaginationMapperParams';
import PaginationMapperService from '../../../../../src/modules/infrastructure/domain/mapper/PaginationMapperService';
import CoupleFindPaginatedRepository from '../../../../../src/modules/apiGateway/domain/repository/CoupleFindPaginatedRepository';
import FindManyPaginatedBaseRepository from '../../../../../src/modules/infrastructure/domain/repository/FindManyPaginateBaseRepository';
import FindManyPaginatedBaseRepositoryParams from '../../../../../src/modules/infrastructure/domain/repository/FindManyPaginatedBaseRepositoryParams';
import DBConnectionHelperFactory from '../../../../../src/utils/database/DBConnectionHelperFactory';
import SecretsBase from '../../../../../src/utils/aws/SecretsBase';
import SecretsManager from '../../../../../src/utils/aws/SecretsManager';
import APIGatewayGetController1_0_0 from '../../../../../src/modules/apiGateway/app/APIGatewayGetController/1.0.0/APIGatewayGetController';
import APIGatewayResultMapperService from '../../../../../src/modules/infrastructure/domain/mapper/APIGatewayResultMapperService';

const container: Container = new Container();

container.bind(TYPES.Default).to(APIGatewayGetController1_0_0);
container.bind(TYPES['1.0.0']).to(APIGatewayGetController1_0_0);
container.bind<Container>(Container).toConstantValue(container);
container.bind<SecretsBase>(TYPES.SecretsManager).to(SecretsManager);
container.bind(TYPES.APIGatewayResultMapperService).to(APIGatewayResultMapperService);
container.bind<DBConnectionHelperFactory>(TYPES.DBConnectionHelperFactory).to(DBConnectionHelperFactory).inSingletonScope();
container.bind<DBConnectionManager>(TYPES.DBConnectionManager).to(DBConnectionManagerTypeORM).inSingletonScope();
container.bind<BaseMapper<Couple, CoupleDto>>(TYPES.CoupleMapper).to(CoupleMapper);
container.bind<BaseMapper<PaginationMapperParams<Array<CoupleDto>>, PaginationResponseDTO<Array<CoupleDto>>>>(TYPES.PaginationMapperService).to(PaginationMapperService);
container.bind(TYPES.ApiGatewayGetAdapter).to(ApiGatewayGetAdapter);
container.bind<UseCase<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryParams<Couple>>>>(TYPES.ApiGatewayGetUseCase).to(ApiGatewayGetUseCase);
// El binding debería ser así, pero no funciona:
container.bind<FindManyPaginatedBaseRepository<Couple>>(TYPES.CoupleFindPaginatedRepository).to(CoupleFindPaginatedRepository);
// Por lo que se hace así:
// container.bind(TYPES.CoupleFindPaginatedRepository).to(CoupleFindPaginatedRepository);
// Sólo es una excepción, el resto de bindings funcionan bien.
export default container