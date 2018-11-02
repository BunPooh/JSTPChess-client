import { plainToClass } from "class-transformer";
import { EventEmitter } from "events";
import { action, computed, observable } from "mobx";

import { AuthService, ProviderType, User } from "../services/auth";

const LOCAL_STORAGE_USER = "@@userStore/user";

type UserStoreHook = "connect" | "disconnect";

export class UserStore {
  @observable
  public user?: User;

  @observable
  public token?: string;

  private authService: AuthService;
  private hooks: EventEmitter;

  constructor(authService: AuthService) {
    this.hooks = new EventEmitter();
    this.authService = authService;
    this.authService.onAuthStateChanged(async (authUser: User) => {
      console.log("firebase auth service state changed", authUser);

      this.setUser(authUser);
      if (authUser) {
        const token = await this.authService.getTokenId();
        this.setToken(token);
        this.emit("connect");
      } else {
        this.setToken(undefined);
        this.emit("disconnect");
      }
    });
  }

  public on(type: UserStoreHook, fn: () => void) {
    this.hooks.on(type, fn);
    // TODO remove
    // console.log("on ", type, this.token);
    // if (type === "connect" && this.token) {
    //   fn();
    // }
    // if (type === "disconnect" && !this.token) {
    //   fn();
    // }
  }
  public off(type: UserStoreHook, fn: () => void) {
    this.hooks.off(type, fn);
  }

  @computed
  public get isAuthenticated() {
    return this.user && this.token ? true : false;
  }

  @action
  public setUser(user?: User) {
    this.user = user;
    if (this.user) {
      localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(this.user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER);
    }
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

  public initializeFromLocalStorage() {
    const userStringified = localStorage.getItem(LOCAL_STORAGE_USER);
    if (userStringified) {
      try {
        const userPlain: object = JSON.parse(userStringified);
        this.setUser(plainToClass(User, userPlain));
      } catch (err) {}
    }
  }

  private emit(type: UserStoreHook) {
    this.hooks.emit(type);
  }
}
