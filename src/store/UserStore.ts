import { action, observable } from "mobx";

export interface IUser {
  uid: string;
  name: string;
}

export class UserStore {
  @observable
  public user?: IUser;

  @observable
  public token?: string;

  @action
  public setUser(user?: IUser) {
    this.user = user;
  }

  @action
  public setToken(token: string) {
    this.token = token;
  }
}
