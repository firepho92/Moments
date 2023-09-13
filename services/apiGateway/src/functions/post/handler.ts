import 'reflect-metadata';
import middy from '@middy/core';
import container from './inversify.config';
import TYPES from './TYPES';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import Controller from '../../../../../src/infrastructure/controller/Controller';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import APIGatewayEventBaseControllerFactory from '../../../../../src/infrastructure/controller/APIGatewayEventBaseControllerFactory';

export const main = middy(async (event: APIGatewayProxyEvent) => {
  // console.log('main handler', event);
  const controllerFactory = new APIGatewayEventBaseControllerFactory(container, event, TYPES);
  const controller: Controller<APIGatewayProxyEvent> = controllerFactory.getInstance();

  const response = await controller.execute(event);
  // console.log('main handler response', response);
  return response;
});


main
  .use(httpJsonBodyParser())
  .use(httpResponseHandlerMiddleware());