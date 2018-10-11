import { action, computed, observable } from "mobx";

export interface IUser {
  uid: string;
  name: string;
}

export type ProviderType = "google" | "facebook";

export class UserStore {
  @observable
  public user?: IUser;

  @observable
  public token?: string;

  @computed
  public get isAuthenticated() {
    return this.user && this.token ? true : false;
  }

  @action
  public setUser(user?: IUser) {
    this.user = user;
  }

  @action
  public setToken(token: string) {
    this.token = token;
  }

  public async signInWithProvider(provider: ProviderType) {}

  public async signOut() {}
}
