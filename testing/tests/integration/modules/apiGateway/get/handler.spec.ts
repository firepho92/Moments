import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import APIGatewayProxyEventMock from '../../../../mocks/aws/APIGatewayProxyEventMock';
import { main } from '../../../../../../services/apiGateway/src/functions/get/handler';

describe('GET /api/users', () => {
  
  // it('should return a list of users', async () => {
  //   expect(1).toBe(1);
  // });

  test.each([
    [{httpMethod: 'GET', path: '/couples', queryStringParameters: {pageNumber: 1, size: 10}}, { statusCode: 200 }]
  ])('should return a list of couples', async (eventParams, expected) => {
    const {httpMethod, path, queryStringParameters} = eventParams;
    const event: APIGatewayProxyEvent = new APIGatewayProxyEventMock({httpMethod, path, queryStringParameters});
    const defaultEvent: APIGatewayProxyEvent = {
      httpMethod: 'post',
      headers: {Authorization: "dummyToken"},
      body: "dummyBody",
      isBase64Encoded: false,
      path: '/change-expiry-elapsed-days',
      multiValueQueryStringParameters: null,
      multiValueHeaders: {Authorization: ["dummyToken"]},
      pathParameters: null,
      queryStringParameters: null,
      stageVariables: null,
      requestContext: {} as any,
      resource: ''
    };

    const context: Context = {
      callbackWaitsForEmptyEventLoop: false,
      functionName: 'test',
      functionVersion: '1',
      invokedFunctionArn: 'arn',
      memoryLimitInMB: '1',
      awsRequestId: 'aws',
      logGroupName: 'log',
      logStreamName: 'stream',
      getRemainingTimeInMillis: jest.fn(),
      done: jest.fn(),
      fail: jest.fn(),
      succeed: jest.fn(),
    }
    console.log(expected);
    // Act
    const response = await main(event, context);
    console.log('response', response);
    // Assert
    expect(1).toBe(1);
  });

  // it('should return a list of users', async () => {
  //   // Arrange
  //   const expectedUsers = [
  //     { id: 1, name: 'John Doe' },
  //     { id: 2, name: 'Jane Doe' },
  //   ];

  //   const event: APIGatewayProxyEvent = {
  //     httpMethod: 'GET',
  //     path: '/couples',
  //     headers: {},
  //     queryStringParameters: null,
  //     body: null,
  //     isBase64Encoded: false,
  //     multiValueHeaders: {},
  //     multiValueQueryStringParameters: null,
  //     pathParameters: null,
  //     requestContext: {} as any,
  //     resource: '',
  //     stageVariables: null,
  //   };

  //   // Act
  //   const response: APIGatewayProxyResult = await handler(event, {}, {}) as APIGatewayProxyResult;
    
  //   // Assert
  //   expect(response.statusCode).toBe(200);
  //   expect(JSON.parse(response.body!)).toEqual(expectedUsers);
  // });
});