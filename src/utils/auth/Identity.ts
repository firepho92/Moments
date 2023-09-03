export default class Identity {
  private _user: string;

  constructor(user: string) {
    this._user = user;
  }

  get user(): string {
    return this._user;
  }
}