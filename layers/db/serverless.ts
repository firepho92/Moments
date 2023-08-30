import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'architecture-example-layer-db-${env:Stage, "local"}',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
    },
    deploymentBucket: {
      name: '${ssm:s3_bucket_deploy_sls, "s3_bucket_deploy_sls"}',
    },
  },
  layers: {
    ArchitectureDb: {
      path: './',
      name: '${env:Stage, "local"}-architecture-example-layer-db',
    }
  },
  resources: {
    Outputs: {
      ArchitectureDbLambdaLayerQualifiedArn: {
        Value: {
          "Ref": "ArchitectureDbLambdaLayer"
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;