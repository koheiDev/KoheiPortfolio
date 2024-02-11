import type { AWS } from '@serverless/typescript';
import hello from '@functions/hello'
import Settings from './settings'

const serverlessConfiguration: AWS = {
  service: 'sls',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  custom: {
    tables: {
      texts: Settings.tables.texts,
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      platform: 'node',
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Scan',
              'dynamodb:Query',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
              //'dynamodb:DescribeTable'
            ],
            Resource: 'arn:aws:dynamodb:ap-northeast-1:*:*'
          }
        ]
      }
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      textTable: '${self:custom.tables.texts}'
    },
    deploymentBucket: {
      name: 'portfolio-api-uploads'
    },
    httpApi: {
      cors:{
        allowCredentials: false,
        allowedHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'X-Amz-User-Agent'],
        allowedOrigins: ['*']
      }

    },
    region: 'ap-northeast-1',
    // stage: 'prod',
  },
  // import the function via paths
  functions: {
    hello,
    graphql: {
      handler: 'src/handlers/graphql.graphqlHandler',
      events: [
        {
          httpApi: {
            method: 'POST',
            path: '/graphql',
          },
        },
        {
          httpApi: {
            path: '/graphql',
            method: 'GET',
          }
        },
      ],
    },
  },
  package: { individually: true },
}
module.exports = serverlessConfiguration


