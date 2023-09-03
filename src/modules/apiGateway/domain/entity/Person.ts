import BaseEntity from '../../../../infrastructure/domain/entity/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import Couple from './Couple';

@Entity({name: 'person'})
export default class Person extends BaseEntity {
  @Column({type: 'varchar', length: 120, name: 'name'})
  name: string;

  @Column({type: 'int2', name: 'age'})
  age: number;

  @OneToMany(() => Couple, (couple) => couple.principal)
  principal: Couple[]

  @OneToMany(() => Couple, (couple) => couple.companion)
  companion: Couple[]

  constructor(name: string, age: number) {
    super();
    if (age < 0)
      throw new Error('Invalid age');
    this.name = name;
    this.age = age;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getAge(): number {
    return this.age;
  }

  setAge(age: number) {
    if (age < 0)
      throw new Error('Invalid age');
    this.age = age;
  }
}