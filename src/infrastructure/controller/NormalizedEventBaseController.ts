import 'reflect-metadata';
import Controller from './Controller';
import { injectable } from 'inversify';
import { SQSEvent, SQSRecord } from 'aws-lambda/trigger/sqs';

//TODO: Renombrar a SQSEventBaseHandler
@injectable()
export default abstract class NormalizedEventBasecontroller<TPort = object, TResponse = object> implements Controller<TPort, PromiseSettledResult<SQSRecord>[]> {
  constructor(){}

  protected abstract run(port?: TPort): Promise<PromiseSettledResult<SQSRecord>[]>;

  async execute(port?: TPort): Promise<PromiseSettledResult<SQSRecord>[]> {
    const items = await this.run(port);
    console.log('items', items);
    return items;
    // const processedRecords: PromiseSettledResult<SQSRecord>[] = port.Records.map((record, index) => {
    //   console.log('record', record, items[index]);
    //   return {
    //     status: items[index].status as PromiseStatus,
    //     value: record
    //   }
    //   // return !items.find((item) => {
    //   //   return item.status === PromiseStatus.FULFILLED && item.value === record;
    //   // });
    // });
    // // const retryItems = port.Records.filter((record) => {
      
    // // });
    // // console.log('Promise response', JSON.stringify(retryItems));
    // // return retryItems;
    // // port.Records.forEach((record) => {console.log('record.body', record.body)});
    // console.log('NormalizedEventBaseHandler', retryItems);
    // return retryItems;
  }
}