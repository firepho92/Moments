export default class APIGatewayProxyEventMock {
  private _httpMethod: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'ANY';
  private _path: string;
  private _headers: { [name: string]: string };
  private _queryStringParameters: { [name: string]: string } | null;
  private _body: string | null;
  private _isBase64Encoded: boolean;
  private _multiValueHeaders: { [name: string]: string[] };
  private _multiValueQueryStringParameters: { [name: string]: string[] } | null;
  private _pathParameters: { [name: string]: string } | null;
  private _requestContext: any;
  private _resource: string;
  private _stageVariables: { [name: string]: string } | null;

  constructor({
    httpMethod,
    path,
    headers = {} as any,
    queryStringParameters = null,
    body = '',
    isBase64Encoded = false,
    multiValueHeaders = {},
    multiValueQueryStringParameters = {},
    pathParameters = {},
    requestContext = {},
    resource = '',
    stageVariables = {},
  }) {
    this._httpMethod = httpMethod;
    this._path = path;
    this._headers = headers;
    this._queryStringParameters = queryStringParameters;
    this._body = body;
    this._isBase64Encoded = isBase64Encoded;
    this._multiValueHeaders = multiValueHeaders;
    this._multiValueQueryStringParameters = multiValueQueryStringParameters;
    this._pathParameters = pathParameters;
    this._requestContext = requestContext;
    this._resource = resource;
    this._stageVariables = stageVariables;
  }

  get httpMethod(): string {
    return this._httpMethod;
  }

  get path(): string {
    return this._path;
  }

  get headers(): { [name: string]: string } {
    return this._headers;
  }

  get queryStringParameters(): { [name: string]: string } | null {
    return this._queryStringParameters;
  }

  get body(): string | null {
    return this._body;
  }

  get isBase64Encoded(): boolean {
    return this._isBase64Encoded;
  }

  get multiValueHeaders(): { [name: string]: string[] } {
    return this._multiValueHeaders;
  }

  get multiValueQueryStringParameters(): { [name: string]: string[] } | null {
    return this._multiValueQueryStringParameters;
  }

  get pathParameters(): { [name: string]: string } | null {
    return this._pathParameters;
  }

  get requestContext(): any {
    return this._requestContext;
  }

  get resource(): string {
    return this._resource;
  }

  get stageVariables(): { [name: string]: string } | null {
    return this._stageVariables;
  }

  get mock(): any {
    return {
      httpMethod: this.httpMethod,
      path: this.path,
      headers: this.headers,
      queryStringParameters: this.queryStringParameters,
      body: this.body,
      isBase64Encoded: this.isBase64Encoded,
      multiValueHeaders: this.multiValueHeaders,
      multiValueQueryStringParameters: this.multiValueQueryStringParameters,
      pathParameters: this.pathParameters,
      requestContext: this.requestContext,
      resource: this.resource,
      stageVariables: this.stageVariables,
    }
  }

}