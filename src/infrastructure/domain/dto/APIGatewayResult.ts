import HttpStatusCode from 'src/utils/enums/httpStatusCode';

export default interface APIGatewayResult<T> {
  statusCode: HttpStatusCode;
  data: T
}