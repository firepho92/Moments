import 'reflect-metadata';
import Controller from './Controller';
import { injectable } from 'inversify';
import Mapper from '../domain/mapper/Mapper';
import APIGatewayResult from '../domain/dto/APIGatewayResult';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import IdentityJWT from 'src/utils/auth/IdentityJWT';

@injectable()
export default abstract class APIGatewayProxyEventBaseController<T=object> implements Controller<APIGatewayProxyEvent, APIGatewayResult<T>> {
  constructor(
    protected apiGatewayResultMapperService: Mapper<T, APIGatewayResult<T>>
  ){}

  protected abstract run(port: APIGatewayProxyEvent): Promise<T>;

  protected abstract validate(port: APIGatewayProxyEvent): Promise<void>;

  async execute(port?: APIGatewayProxyEvent): Promise<APIGatewayResult<T>> {
    // console.log('APIGatewayProxyEventBaseController', port);
    IdentityJWT.getInstance(port);
    await this.validate(port);
    const entityDto: T = await this.run(port);
    const response = this.apiGatewayResultMapperService.execute(entityDto);
    return response;
  }
}