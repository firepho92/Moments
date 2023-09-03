import { handlerPath } from '../../lib/handler-resolver';
import type { AWS } from '@serverless/typescript';

const lambda: AWS['functions']['k'] = {
  name: '${self:custom.func_prefix}-post',
  handler: `${handlerPath(__dirname)}/handler.main`,
  logRetentionInDays: 14,
  events: [
    {
      http: {
        method: 'post',
        path: 'management',
        cors: true,
      },
    },
  ],
};

export default lambda;