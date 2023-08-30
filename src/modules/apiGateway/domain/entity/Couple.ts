import BaseEntity from '../../../../../src/modules/infrastructure/domain/entity/BaseEntity';
import { Entity, ManyToOne } from 'typeorm';
import Person from './Person';
import Warning from '../../../../../src/utils/error/Warning';
import HttpStatusCode from '../../../../../src/utils/enums/httpStatusCode';
import ErrorCode from '../../../../../src/utils/error/errorCode';

@Entity({name: 'couple'})
export default class Couple extends BaseEntity {
  @ManyToOne(() => Person, (person) => person.principal, {nullable: false})
  principal: Person;

  @ManyToOne(() => Person, (person) => person.companion, {nullable: false})
  companion: Person;

  constructor(principal: Person, companion: Person) {
    super();
    console.log(principal, companion);
    if (principal?.age < 18 || companion?.age < 18)
      throw new Warning(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR1001);
    this.principal = principal;
    this.companion = companion;
  }
}