import { action, computed, observable } from "mobx";
import { connect } from "socket.io-client";

interface ISocketEvent {
  type: string;
  fn: (...args: any[]) => void;
}

export class WsStore {
  @observable
  public socket?: SocketIOClient.Socket;

  @observable
  public connectionError?: string;

  @observable
  public reconnectFailed: boolean = false;

  // public connected: boolean = false
  @computed
  public get connected() {
    return this.socket ? this.socket.connected : false;
  }

  private events: ISocketEvent[] = [];

  @action
  public connect(path: string, options: SocketIOClient.ConnectOpts = {}) {
    const defaultOptions: SocketIOClient.ConnectOpts = {
      transports: ["websocket"],
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
      reconnectionAttempts: 3
    };
    this.socket = connect(
      path,
      {
        ...defaultOptions,
        ...options
      }
    );

    this.reconnectFailed = false;
    this.setConnectionError(undefined);

    this.socket.on("error", () => {});
    this.socket.on("connect", (e: any) => {
      this.setConnectionError(undefined);
    });
    this.socket.on("disconnect", (e: any) => {
      this.setConnectionError("ws/disconnect");
    });
    this.socket.on("connect_error", (e: any) => {
      this.setConnectionError("ws/connect_error");
    });
    this.socket.on("connect_timeout", (e: any) => {
      this.setConnectionError("ws/connect_error");
    });
    this.socket.on("reconnect_attempt", (e: any) => {
      this.setConnectionError("ws/connect_retry");
    });
    this.socket.on("reconnect_error", () => {});
    this.socket.on("reconnect_failed", () => {
      this.setConnectionError("ws/reconnect_failed");
      this.reconnectFailed = true;
    });

    this.events.forEach(event => {
      if (this.socket) {
        this.socket.on(event.type, event.fn);
      }
    });
  }

  public on(type: string, fn: (...args: any[]) => void) {
    this.events.push({
      type,
      fn
    });
    if (this.socket) {
      this.socket.on(type, fn);
    }
  }
  public off(type: string, fn: (...args: any[]) => void) {
    const index = this.events.findIndex(event => {
      return event.type === type && event.fn === fn;
    });
    if (index === -1) {
      return;
    }
    this.events.splice(index);
    if (this.socket) {
      this.socket.off(type, fn);
    }
    // try again to make sure there is no other item to remove
    this.off(type, fn);
  }

  public emit(type: string, payload?: any) {
    if (this.socket) {
      this.socket.emit(type, payload);
    }
  }

  @action
  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("disconnect");
      this.socket = undefined;
    }
  }

  @action
  public setConnectionError(error?: string) {
    this.connectionError = error;
  }
}
