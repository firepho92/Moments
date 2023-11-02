import 'reflect-metadata';
import User from './User';
import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';

@Entity({name: 'role', schema: 'management'})
export default class Role extends BaseEntity {

  @Column({type: 'varchar', length: 120, name: 'name'})
  private _name: string;

  @OneToMany(() => User, (user: User) => user.role)
  private _users: User[];

  constructor() {
    super();
  }

  get name(): string {
    return this._name;
  }

  get users(): User[] {
    return this._users;
  }
}