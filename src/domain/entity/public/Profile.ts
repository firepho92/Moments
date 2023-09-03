import 'reflect-metadata';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';
import { Column, Entity, OneToOne } from 'typeorm';
import User from '../admin/User';

@Entity({name: 'profile', schema: 'public'})
export default class Profile extends BaseEntity {
  @Column({type: 'varchar', length: 120, name: 'name', nullable: false})
  private _name: string;

  @Column({type: 'varchar', length: 120, name: 'email', nullable: false})
  private _email: string;

  @OneToOne(() => User, (user: User) => user.profile)
  private _user: User;

  constructor(name: string, email: string) {
    super();
    this._name = name;
    this._email = email;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get user(): User {
    return this._user;
  }
}