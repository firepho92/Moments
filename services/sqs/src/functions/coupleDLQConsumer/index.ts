import type { AWS } from '@serverless/typescript';
import { handlerPath } from '../../lib/handler-resolver';

const lambda: AWS['functions']['k'] = {
  name: '${self:custom.func_prefix}-couple-dlq-consumer',
  handler: `${handlerPath(__dirname)}/handler.main`,
  logRetentionInDays: 14,
  events: [
    {
      sqs: {
        arn: '${env:SqsDemoSingleExampleSQSDeadLetterArn}',
        batchSize: 1,
      },
    },
  ],
};

export default lambda;