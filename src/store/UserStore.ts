import { action, computed, observable } from "mobx";

import { AuthService, ProviderType, User } from "../services/auth";

export class UserStore {
  @observable
  public user?: User;

  @observable
  public token?: string;

  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.authService.onAuthStateChanged(async (authUser: User) => {
      console.log("firebase auth service state changed", authUser);

      this.setUser(authUser);
      if (authUser) {
        const token = await this.authService.getTokenId();
        this.setToken(token);
      } else {
        this.setToken(undefined);
      }
    });
  }

  @computed
  public get isAuthenticated() {
    return this.user && this.token ? true : false;
  }

  @action
  public setUser(user?: User) {
    this.user = user;
  }

  @action
  public setToken(token?: string) {
    this.token = token;
  }

  public async signInWithProvider(provider: ProviderType) {
    await this.authService.signInWithProvider(provider);
  }

  public async signOut() {
    await this.authService.signOut();
  }
}
