import 'reflect-metadata';
import TYPES from '../../../../src/TYPES';
import { inject, injectable } from 'inversify';
import ApiGatewayPostAdapterParams from './ApiGatewayPostAdapterParams';
import Adapter from '../../../../src/modules/infrastructure/adapter/Adapter';
import UseCase from '../../../../src/modules/infrastructure/useCase/UseCase';
import Couple from '../../../../src/modules/apiGateway/domain/entity/Couple';
import CoupleDto from '../../../../src/modules/apiGateway/domain/dto/CoupleDto';
import ApiGatewayPostUseCaseParams from '../useCase/ApiGatewayPostUseCaseParams';
import BaseMapper from '../../../../src/modules/infrastructure/domain/mapper/BaseMapper';

@injectable()
export default class ApiGatewayPostAdapter implements Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>> {
  constructor(
    @inject(TYPES.ApiGatewayPostUseCase) private apiGatewayPostUseCase: UseCase<ApiGatewayPostUseCaseParams, Promise<Couple>>,
    @inject(TYPES.CoupleMapper) private coupleMapper: BaseMapper<Couple, CoupleDto>
  ) {}

  async execute(port: ApiGatewayPostAdapterParams): Promise<CoupleDto> {
    const apiGatewayPostUseCaseParams = {
      principal: port.couple.at(0),
      companion: port.couple.at(1)
    };

    const couple = await this.apiGatewayPostUseCase.execute(apiGatewayPostUseCaseParams);
    // console.log('ApiGatewayAdapter couple', couple);
    const coupleDto = this.coupleMapper.execute(couple);
    // console.log('coupleDto', coupleDto);
    return coupleDto;
  }
}