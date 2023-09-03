import 'reflect-metadata';
import TYPES from '../../../../src/TYPES';
import Couple from '../domain/entity/Couple';
import { injectable, inject } from 'inversify';
import CoupleDto from '../domain/dto/CoupleDto';
import Adapter from '../../../infrastructure/adapter/Adapter';
import UseCase from '../../../infrastructure/useCase/UseCase';
import BaseMapper from '../../../infrastructure/domain/mapper/BaseMapper';
import PaginationQueryDTO from '../../../infrastructure/domain/dto/PaginationQueryDTO';
import PaginationResponseDTO from '../../../infrastructure/domain/dto/PaginationResponseDTO';
import PaginationMapperParams from '../../../infrastructure/domain/dto/PaginationMapperParams';

@injectable()
export default class ApiGatewayGetAdapter implements Adapter<PaginationQueryDTO, Promise<PaginationResponseDTO<Array<CoupleDto>>>> {
  constructor(
    @inject(TYPES.CoupleMapper) private coupleMapper: BaseMapper<Couple, CoupleDto>,
    @inject(TYPES.PaginationMapperService) private paginationMapperService: BaseMapper<PaginationMapperParams<Array<CoupleDto>>, PaginationResponseDTO<Array<CoupleDto>>>,
    @inject(TYPES.ApiGatewayGetUseCase) private apiGatewayGetUseCase: UseCase<PaginationQueryDTO, Promise<{items: Couple[], count: number}>>
  ) {}

  async execute(port?: PaginationQueryDTO): Promise<PaginationResponseDTO<Array<CoupleDto>>> {
    console.log('ApiGatewayGetAdapter execute', port);
    const { items: couples, count } = await this.apiGatewayGetUseCase.execute(port);
    const couplesDto: Array<CoupleDto> = this.coupleMapper.execute(couples);
    const couplesPaginated: PaginationResponseDTO<Array<CoupleDto>> = this.paginationMapperService.execute(new PaginationMapperParams(port.pageNumber, port.size, count, couplesDto));
    return couplesPaginated;
  }
}