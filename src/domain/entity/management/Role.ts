import 'reflect-metadata';
import User from './User';
import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';

@Entity({name: 'role', schema: 'management'})
export default class Role extends BaseEntity {

  @Column({type: 'varchar', length: 120, name: 'name'})
  name: string;

  @OneToMany(() => User, (user: User) => user.role)
  users: User[];

  constructor(name: string) {
    super();
    this.name = name;
  }
}