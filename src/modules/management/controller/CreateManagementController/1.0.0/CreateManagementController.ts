import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import Adapter from 'src/infrastructure/adapter/Adapter';
import Mapper from 'src/infrastructure/domain/mapper/Mapper';
import TenantByUserDto from 'src/domain/dto/admin/TenantByUserDto';
import APIGatewayResult from 'src/infrastructure/domain/dto/APIGatewayResult';
import APIGatewayProxyEventBaseController from 'src/infrastructure/controller/APIGatewayProxyEventBaseController';

@injectable()
export default class CreateMomentSpaceAdminController extends APIGatewayProxyEventBaseController<TenantByUserDto> {
  constructor(
    @inject(TYPES.CreateManagementAdapter) private readonly adapter: Adapter<never, Promise<TenantByUserDto>>,
    @inject(TYPES.APIGatewayResultMapperService) apiGatewayResultMapperService: Mapper<TenantByUserDto, APIGatewayResult<TenantByUserDto>>
  ) {
    super(apiGatewayResultMapperService);
  }

  protected async validate(): Promise<void> {
  }

  protected async run(): Promise<TenantByUserDto> {
    const tenantByUserDto: TenantByUserDto = await this.adapter.execute();
    return tenantByUserDto;
  }
}