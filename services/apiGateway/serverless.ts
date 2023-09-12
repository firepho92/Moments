import type { AWS } from '@serverless/typescript';

import functions from './src/functions';

const serverlessConfiguration: AWS = {
  service: '${self:custom.func_prefix}',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dotenv-plugin',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    // region: 'us-east-1',
    region: '${env:AwsRegion, "us-east-1"}' as AWS['provider']['region'],
    tags: {
      department: '${env:Department, "ti"}',
      environment: '${env:Stage, "local"}',
      project_name: '${env:ProjectName, "project"}',
      cost_center: '${env:CostCenter, "cost-center"}',
    },
    stage: '${env:Stage, "dev"}',
    apiGateway: {
      restApiId: '${env:ApiGatewayId,"restApiId"}',
      restApiRootResourceId: '${env:ApiGatewayResourcesId,"restApiRootResourceId"}',
    },
    tracing: {
      lambda: true,
    },
    environment: {
      BucketContentName: '${env:BucketContentName,"BucketContentName"}',
      SecretDBName: '${env:SecretDBName,"SecretDBName"}',
      TableExampleTableName: '${env:TableExampleTableName,"TableExampleTableName"}',
      TableDemoDynamoDBName: '${env:TableDemoDynamoDBName,"TableDemoDynamoDBName"}',
      TableDemoDynamoDBIndexName: '${env:TableDemoDynamoDBIndexName,"TableDemoDynamoDBIndexName"}',
      SqsDemoSingleExampleSQSDeadLetterArn: '${env:SqsDemoSingleExampleSQSDeadLetterArn,"SqsDemoSingleExampleSQSDeadLetterArn"}',
      SqsDemoSingleExampleSQSDeadLetterUrl: '${env:SqsDemoSingleExampleSQSDeadLetterUrl,"SqsDemoSingleExampleSQSDeadLetterUrl"}',
      SqsDemoSingleExampleSQSArn: '${env:SqsDemoSingleExampleSQSArn,"SqsDemoSingleExampleSQSArn"}',
      SqsDemoSingleExampleSQSUrl: '${env:SqsDemoSingleExampleSQSUrl,"SqsDemoSingleExampleSQSUrl"}',
      SqsGroupExampleDeadLetterArn: '${env:SqsGroupExampleDeadLetterArn,"SqsGroupExampleDeadLetterArn"}',
      SqsGroupExampleDeadLetterUrl: '${env:SqsGroupExampleDeadLetterUrl,"SqsGroupExampleDeadLetterUrl"}',
      SqsGroupExampleArn: '${env:SqsGroupExampleArn,"SqsGroupExampleArn"}',
      SqsGroupExampleUrl: '${env:SqsGroupExampleUrl,"SqsGroupExampleUrl"}',
      SqsPaginatedExampleDeadLetterArn: '${env:SqsPaginatedExampleDeadLetterArn,"SqsPaginatedExampleDeadLetterArn"}',
      SqsPaginatedExampleDeadLetterUrl: '${env:SqsPaginatedExampleDeadLetterUrl,"SqsPaginatedExampleDeadLetterUrl"}',
      SqsPaginatedExampleArn: '${env:SqsPaginatedExampleArn,"SqsPaginatedExampleArn"}',
      SqsPaginatedExampleUrl: '${env:SqsPaginatedExampleUrl,"SqsPaginatedExampleUrl"}',
      SnsExampleTopicEmailArn: '${env:SnsExampleTopicEmailArn,"SnsExampleTopicEmailArn"}',
      SnsExampleTopicArn: '${env:SnsExampleTopicArn,"SnsExampleTopicArn"}',
      ProjectName: '${env:ProjectName,"ProjectName"}',
      Stage: '${env:Stage,"local"}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      FailedEmailsTable: '${env:FailedEmailsTable, "FailedEmailsTable"}',
      SqsFailedEmailsSQSDeadLetterArn: '${env:SqsFailedEmailsSQSDeadLetterArn, "SqsFailedEmailsSQSDeadLetterArn"}',
      SqsFailedEmailsSQSDeadLetterUrl: '${env:SqsFailedEmailsSQSDeadLetterUrl, "SqsFailedEmailsSQSDeadLetterUrl"}',
      SqsFailedEmailsSQSArn: '${env:SqsFailedEmailsSQSArn, "SqsFailedEmailsSQSArn"}',
      SqsFailedEmailsSQSUrl: '${env:SqsFailedEmailsSQSUrl, "SqsFailedEmailsSQSUrl"}',
      CLEVER_FRM_SERVICES: '${env:CLEVER_FRM_SERVICES, "CLEVER_FRM_SERVICES"}',
      CLEVER_AUTH_SERVICES: '${env:CLEVER_AUTH_SERVICES, "CLEVER_AUTH_SERVICES"}',
      CLEVER_USER: '${ssm:CLEVER_USER, "CLEVER_USER"}',
      CLEVER_USER_PWD: '${ssm:CLEVER_USER_PWD, "CLEVER_USER_PWD"}',      
    },
    layers: [
      '${param:commonLib, "commonlib"}',
      "${param:commonDb, 'commondb'}",
    ],
    deploymentBucket: {
      name: '${ssm:s3_bucket_deploy_sls, "s3bucketdeploysls"}',
    },
    iam: {
      role: '${env:IamRole, "IamRole"}',
    },
    vpc: {
      securityGroupIds: { 'Fn::Split': [',', '${ssm:securityGroupIds, "SECURITY_GROUP_IDS"}'] },
      subnetIds: { 'Fn::Split': [',', '${ssm:subnetIds, "SUBNETS_IDS"}'] },
    },
  },
  // import the function via paths
  functions,
  package: { 
    individually: true,
    patterns: ['!**/node_modules/**', '!node_modules/']
  },
  custom: {
    esbuild: {
      external:[
        "aws-sdk",
        "pg",
        "typeorm",
        "typeorm-naming-strategies",
        "pg-native",
        "@aws-sdk/client-secrets-manager",
        "@aws-sdk/client-sqs",
        "@middy/core",
        "@middy/http-json-body-parser",
        "@middy/sqs-partial-batch-failure",
        "camelcase-keys-deep",
        "inversify",
        "joi",
        "uuid",
        "reflect-metadata",
      ],
      bundle: true,
      minify: false,
      sourcemap: process.env.IS_OFFLINE === 'true',
      exclude: ['*'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    service: 'api-gateway',
    'project-name': 'architecture',
    stage: '${env:Stage, "local"}',
    func_prefix: '${self:custom.stage}-${self:custom.project-name}-${self:custom.service}',
  },
};

module.exports = serverlessConfiguration;