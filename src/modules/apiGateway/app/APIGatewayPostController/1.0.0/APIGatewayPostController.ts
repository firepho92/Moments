import 'reflect-metadata';
import schema from './schema';
import { inject, injectable } from 'inversify';
import TYPES from '../../../../../../src/TYPES';
import CoupleDto from '../../../domain/dto/CoupleDto';
import Validator from '../../../../../../src/utils/request/Validator';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import Adapter from '../../../../../infrastructure/adapter/Adapter';
import ApiGatewayPostAdapterParams from '../../../adapter/ApiGatewayPostAdapterParams';
import Mapper from '../../../../../infrastructure/domain/mapper/Mapper';
import { VALIDATOR_TYPE } from '../../../../../../src/middleware/httpJoiValidatorMiddleware';
import APIGatewayResult from '../../../../../infrastructure/domain/dto/APIGatewayResult';
import APIGatewayProxyEventBaseController from '../../../../../infrastructure/controller/APIGatewayProxyEventBaseController';

@injectable()
export default class ApiGatewayPostController extends APIGatewayProxyEventBaseController<CoupleDto> {
  
  constructor(
    @inject(TYPES.ApiGatewayPostAdapter) private readonly adapter: Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>>,
    @inject(TYPES.APIGatewayResultMapperService) apiGatewayResultMapperService: Mapper<CoupleDto, APIGatewayResult<CoupleDto>>
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

  protected async run(port?: APIGatewayProxyEvent): Promise<CoupleDto> {
    console.log('ApiGatewayPostController1_0_0');
    
    const coupleDto: CoupleDto = await this.adapter.execute(port.body as unknown as ApiGatewayPostAdapterParams);
    return coupleDto;
  }
}