import TYPES from './TYPES';
import { Container } from 'inversify/lib/container/container';
import Adapter from '../../../../../src/modules/infrastructure/adapter/Adapter';
import InvalidCoupleHandler from '../../../../../src/modules/sqs/app/InvalidCoupleHandler';
import InvalidCoupleAdapter from '../../../../../src/modules/sqs/adapter/InvalidCoupleAdapter';

const container: Container = new Container();

container.bind(TYPES.Default).to(InvalidCoupleHandler);
container.bind<Adapter<any, Promise<string>>>(TYPES.InvalidCoupleAdapter).to(InvalidCoupleAdapter);

export default container;