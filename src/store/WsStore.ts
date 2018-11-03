import { action, observable } from "mobx";
import { connect } from "socket.io-client";

interface ISocketEvent {
  type: string;
  fn: (...args: any[]) => void;
}

export class WsStore {
  @observable
  public socket?: SocketIOClient.Socket;

  @observable
  public _connectionError?: string;

  @observable
  public _reconnectFailed: boolean = false;

  @observable
  public _connected: boolean = false;

  public get connectionError() {
    return this._connectionError;
  }
  public get connected() {
    return this._connected;
  }
  public get reconnectFailed() {
    return this._reconnectFailed;
  }

  private events: ISocketEvent[] = [];

  @action
  public connect(path: string, options: SocketIOClient.ConnectOpts = {}) {
    const defaultOptions: SocketIOClient.ConnectOpts = {
      transports: ["websocket"],
      reconnectionDelay: 1000,
      reconnectionDelayMax: 3000,
      reconnectionAttempts: 2
    };
    this.socket = connect(
      path,
      {
        ...defaultOptions,
        ...options
      }
    );

    this.setConnected(false);
    this.setReconnectFailed(false);
    this.setConnectionError(undefined);

    this.socket.on("error", () => {});
    this.socket.on("connect", (e: any) => {
      this.setConnectionError(undefined);
      this.setConnected(true);
    });
    this.socket.on("disconnect", (e: any) => {
      this.setConnectionError("ws/disconnect");
      this.setConnected(false);
    });
    this.socket.on("connect_error", (e: any) => {
      this.setConnectionError("ws/connect_error");
      this.setConnected(false);
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
      this.setReconnectFailed(false);
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
  private setConnectionError(error?: string) {
    this._connectionError = error;
  }

  @action
  private setReconnectFailed(status: boolean) {
    this._reconnectFailed = status;
  }

  @action
  private setConnected(status: boolean) {
    this._connected = status;
  }
}
