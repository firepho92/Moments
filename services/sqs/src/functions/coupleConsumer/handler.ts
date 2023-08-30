import 'reflect-metadata';
import TYPES from './TYPES';
import middy from '@middy/core';
import container from './inversify.config';
import { SQSEvent, SQSRecord } from 'aws-lambda';
import eventNormalizerMiddleware from '@middy/event-normalizer';
import sqsPartialBatchFailure from '@middy/sqs-partial-batch-failure';
import Controller from '../../../../../src/modules/infrastructure/controller/Controller';
import NormalizedEventControllerFactory from '../../../../../src/modules/infrastructure/controller/NormalizedEventControllerFactory';

export const main = middy(async (event: SQSEvent): Promise<SQSRecord[]> => {
  // console.log('invalid', event);
  const controllerFactory = new NormalizedEventControllerFactory(container, event, TYPES);
  const controller: Controller = controllerFactory.getInstance();
  // const handler = container.get<Controller<SQSEvent, SQSRecord[]>>(TYPES[event.version]);
  // const response = await handler.execute(event);
  const response = await controller.execute(event) as SQSRecord[];
  console.log('handler', response);
  return response;
});

main
  .use(eventNormalizerMiddleware())
  .use(sqsPartialBatchFailure());