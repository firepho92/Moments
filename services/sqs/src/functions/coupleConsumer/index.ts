import type { AWS } from '@serverless/typescript';
import { handlerPath } from '../../lib/handler-resolver';

const lambda: AWS['functions']['k'] = {
  name: '${self:custom.func_prefix}-couple-consumer',
  handler: `${handlerPath(__dirname)}/handler.main`,
  logRetentionInDays: 14,
  timeout: 30,
  events: [
    {
      sqs: {
        arn: '${env:SqsDemoSingleExampleSQSArn}',
        batchSize: 10,
        functionResponseType: 'ReportBatchItemFailures'
        // filterPatterns: [
        //   {
        //     body: {
        //       type: ['invalid'],
        //     },
        //   }
        // ]
      },
    },
  ],
};

export default lambda;