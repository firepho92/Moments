import 'reflect-metadata';
import TYPES from 'src/TYPES';
import schema from './schema';
import { inject, injectable } from 'inversify';
import { APIGatewayProxyEvent } from 'aws-lambda';
import Adapter from 'src/infrastructure/adapter/Adapter';
import Mapper from 'src/infrastructure/domain/mapper/Mapper';
import TenantByUserDto from 'src/domain/dto/admin/TenantByUserDto';
import APIGatewayResult from 'src/infrastructure/domain/dto/APIGatewayResult';
import APIGatewayProxyEventBaseController from 'src/infrastructure/controller/APIGatewayProxyEventBaseController';
import Validator, { VALIDATOR_TYPE } from 'src/utils/request/Validator';

@injectable()
export default class CreateMomentSpaceAdminController extends APIGatewayProxyEventBaseController<TenantByUserDto> {
  constructor(
    @inject(TYPES.CreateManagementAdapter) private readonly adapter: Adapter<string, Promise<TenantByUserDto>>,
    @inject(TYPES.APIGatewayResultMapperService) apiGatewayResultMapperService: Mapper<TenantByUserDto, APIGatewayResult<TenantByUserDto>>
  ) {
    super(apiGatewayResultMapperService);
  }

  protected async validate(port: APIGatewayProxyEvent): Promise<void> {
    const validator = new Validator({
      schema,
      event: port,
      type: VALIDATOR_TYPE.BODY
    });
    await validator.execute();
  }

  protected async run(port: APIGatewayProxyEvent & { body: unknown }): Promise<TenantByUserDto> {
    // console.log('CreateMomentSpaceAdminController run', port);
    const { space } = port.body as unknown as { space: string };
    const tenantByUserDto: TenantByUserDto = await this.adapter.execute(space);
    return tenantByUserDto;
  }
}