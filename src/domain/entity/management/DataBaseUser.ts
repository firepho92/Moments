import generator from 'generate-password';

export default class DataBaseUser {
  private readonly _username: string;
  private readonly _password: string;

  constructor(username: string, password ?: string) {
    this._username = username;
    this._password = password ?? generator.generate({ length: 10, numbers: true, symbols: true });
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }
}