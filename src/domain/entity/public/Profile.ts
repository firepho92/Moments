import 'reflect-metadata';
import BaseEntity from 'src/infrastructure/domain/entity/BaseEntity';

import User from '../management/User';


export default class Profile extends BaseEntity {
  
  private _name: string;

  
  private _email: string;

  
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