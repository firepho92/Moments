import Controller from './Controller';
import Exception from 'src/utils/error/Exception';
import ErrorCode from 'src/utils/error/errorCode';
import HttpStatusCode from 'src/utils/enums/httpStatusCode';
import { Container } from 'inversify/lib/container/container';
import NormalizedEventBaseController from './NormalizedEventBaseController';
import EventBaseControllerFactory from './EventBaseControllerFactory';
import { SQSEvent } from 'aws-lambda';

type T = SQSEvent;

export default class NormalizedEventControllerFactory<T, U> extends EventBaseControllerFactory<T> {
  constructor(
    private readonly container: Container,
    private readonly event: T,
    private readonly handlerTypes: { [key: string]: symbol }
  ) {
    super();
  }

  protected getVersion(event: T): string {
    throw new Error('Method not implemented.');
  }

  getInstance(): Controller {
    // console.log('httpRequestVersionHandlerMiddleware');
    const regex = /version=([\d.]+)/;
    const matches = this.event.headers['Accept'].match(regex);
    console.log('matches', matches);
    const version = matches ? matches.at(1) : 'Default';
    console.log('version', version);
    // if (!versions.includes(version)) throw new Exception(HttpStatusCode.BAD_REQUEST, [ErrorCode.ERR0017], []);
    // request.event.version = version;
    if (!Object.keys(this.handlerTypes).includes(version)) throw new Exception(HttpStatusCode.BAD_REQUEST, [ErrorCode.ERR0017], []);
    const controller: Controller = this.container.get<NormalizedEventBaseController>(this.handlerTypes[version]);
    return controller;
  }
}