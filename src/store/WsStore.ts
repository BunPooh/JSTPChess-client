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

  @computed
  public get connected() {
    return this.socket ? this.socket.connected : false;
  }

  private events: ISocketEvent[] = [];

  @action
  public connect(path: string, timeout: number = 2500) {
    this.socket = connect(
      path,
      {
        timeout,
        transports: ["websocket"],
        reconnectionDelay: 2000,
        reconnectionDelayMax: 10000
      }
    );
    this.events.forEach(event => {
      if (this.socket) {
        this.socket.on(event.type, event.fn);
      }
    });

    this.socket.on("error", (e: any) => {
      console.log("error", e);
      // this.setConnectionError(undefined);
    });
    this.socket.on("connect", (e: any) => {
      this.setConnectionError(undefined);
    });
    this.socket.on("disconnect", (e: any) => {
      console.log("disconnected");
      this.setConnectionError("Disconnected from server");
    });
    this.socket.on("connect_error", (e: any) => {
      console.log("connect_error");
      this.setConnectionError("Could not connect to server");
    });
    this.socket.on("connect_timeout", (e: any) => {
      console.log("connect_timeout");
      this.setConnectionError("Could not connect to server");
    });
    this.socket.on("reconnect_attempt", (e: any) => {
      console.log("reconnect_attempt");
      this.setConnectionError("Trying to reconnect...");
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
