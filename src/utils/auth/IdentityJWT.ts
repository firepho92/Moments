import Identity from './Identity';
import { APIGatewayProxyEvent } from 'aws-lambda';

export class Email {
  private _email: string;
  private _username: string;
  private _domain: string;

  constructor(email: string) {
    this._email = email;
    this._username = email.split('@')[0];
    this._domain = email.split('@')[1];
  }

  get username(): string {
    return this._username;
  }

  get domain(): string {  
    return this._domain;
  }

  toString(): string {
    return this._email;
  }
}

export default class IdentityJWT extends Identity {

  private static _instance: IdentityJWT;
  private _email: Email;

  private constructor(event: APIGatewayProxyEvent) {
    const email = new Email(event.requestContext.authorizer.claims['email']);
    super(email.username);
    this._email = email;
    // console.log('IdentityJWT', event.requestContext.authorizer.claims);
  }

  public static getInstance(event?: APIGatewayProxyEvent): IdentityJWT {
    if (!IdentityJWT._instance) {
      IdentityJWT._instance = new IdentityJWT(event);
    }
    return IdentityJWT._instance;
  }

  get email(): Email {
    return this._email;
  }
}