import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'pr-moments-lib-${env:Stage, "local"}',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    deploymentBucket: {
      name: '${ssm:s3_bucket_deploy_sls, "s3_bucket_deploy_sls"}',
    },
  },
  layers: {
    PrMomentsLib: {
      path: './',
      name: '${env:Stage, "local"}-pr-moments-lib',
    }
  },
  resources: {
    Outputs: {
      PrMomentsLibLambdaLayerQualifiedArn: {
        Value: {
          "Ref": 'PrMomentsLibLambdaLayer'
        }
      }
    }
  },
  custom: {
    service: 'api-gateway',
    stage: '${env:Stage, "local"}',
    func_prefix: '${self:custom.stage}-${self:custom.service}',
  }
}

module.exports = serverlessConfiguration; 