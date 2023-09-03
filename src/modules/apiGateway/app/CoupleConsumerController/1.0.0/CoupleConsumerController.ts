import 'reflect-metadata'
import TYPES from '../../../../../TYPES';
import { SQSEvent } from 'aws-lambda';
import { inject } from 'inversify/lib/annotation/inject';
import Adapter from '../../../../../infrastructure/adapter/Adapter';
import NormalizedEventBaseHandler from '../../../../../infrastructure/controller/NormalizedEventBaseController';

export default class CoupleConsumerController extends NormalizedEventBaseHandler {
  constructor (
    @inject(TYPES.InvalidCoupleAdapter) private readonly adapter: Adapter<any, Promise<string>>
  ) {
    super();
  }
  protected run(port?: SQSEvent): Promise<any> {
    console.log('CoupleConsumerController1_0_0', JSON.stringify(port));
    return this.adapter.execute(port);
  }
}