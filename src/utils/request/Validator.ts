import Joi from 'joi';
import Warning from '../../../src/utils/error/Warning';
import ErrorCode from '../../../src/utils/error/errorCode';
import HttpStatusCode from '../../../src/utils/enums/httpStatusCode';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';

export interface ValidationInput {
  schema: Joi.ObjectSchema | Joi.ArraySchema | Joi.StringSchema;
  type: VALIDATOR_TYPE;
  pathParam?: string;
  event: APIGatewayProxyEvent;
}

export enum VALIDATOR_TYPE {
  BODY = 'BODY',
  PATH = 'PATH',
  QUERY = 'QUERY',
}

export default class Validator {

  constructor(
    private readonly validationInput: ValidationInput
  ) {}

  async execute() {
    // const schema = validationInput.schemas[request.event.version];
    // console.log('schema', schema);
    // console.log('validateData', this.validationInput);
    try {
      // Validation for body
      if (this.validationInput.type === VALIDATOR_TYPE['BODY']) {
        await this.validationInput.schema.validateAsync(
          this.validationInput.event.body,
          { abortEarly: false }
        );
      }

      // Validation for query
      if (this.validationInput.type === VALIDATOR_TYPE['QUERY']) {
        await this.validationInput.schema.validateAsync(
          this.validationInput.event.queryStringParameters ? this.validationInput.event.queryStringParameters : {},
          { abortEarly: false }
        );
      }

      // Validation for path
      if (this.validationInput.type === VALIDATOR_TYPE['PATH']) {
        await this.validationInput.schema.validateAsync(
          this.validationInput.event.pathParameters[this.validationInput.pathParam ? this.validationInput.pathParam : 'id'],
          { abortEarly: false }
        );
      }
    } catch (err) {
      console.error('JOI ERR: ', err)

      const errorCodes = [];
      err.details.forEach( (detail: { message: string; }) => {
        if (ErrorCode[detail.message]){
          errorCodes.push(ErrorCode[detail.message]);
        }
      });
      if(errorCodes.length > 0){
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], errorCodes);
      }

      throw new Warning(HttpStatusCode.BAD_REQUEST, [], [ErrorCode.ERR0008]);
    }
  }
}