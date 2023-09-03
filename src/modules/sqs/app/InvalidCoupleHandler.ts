import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import { PromiseStatus } from 'src/utils/enums/PromiseStatus';
import Adapter from 'src/infrastructure/adapter/Adapter';
import type { SQSBatchResponse, SQSEvent, SQSRecord } from 'aws-lambda';
import NormalizedEventBaseHandler from 'src/infrastructure/controller/NormalizedEventBaseController';

@injectable()
export default class InvalidCoupleHandler extends NormalizedEventBaseHandler {

  constructor(
    @inject(TYPES.InvalidCoupleAdapter) private adapter: Adapter<any, Promise<string>>
  ) {
    super();
  }

  protected async run(port?: SQSEvent): Promise<PromiseSettledResult<SQSRecord>[]> {
    console.log('InvalidCoupleHandler', JSON.stringify(port));
    const responses = port.Records.map(async (record) => {
      // console.log('record', record);
      await this.adapter.execute(record.body);
      return record;
    });

    const items = await Promise.allSettled(responses);
    // console.log('promises completed', items);
    // const retryItems = port.Records.filter((record) => {
    //   return !items.find((item) => {
    //     return item.status === PromiseStatus.FULFILLED && item.value === record;
    //   });
    // });
    // console.log('Promise response', JSON.stringify(retryItems));
    return items;
  }
}