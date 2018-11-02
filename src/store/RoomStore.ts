import { action, observable } from "mobx";

import { IUser } from "../services/auth";
import { WsStore } from "./WsStore";

export type PlayerColor = "w" | "b";

export interface IPlayer {
  user: IUser;
  color: PlayerColor;
}

export interface IRoom {
  id: string;
  players: IPlayer[];
}

export interface IChessGame {
  pgn?: string;
  status?: string;
}

export class RoomStore {
  @observable
  public rooms: IRoom[] = [];

  @observable
  public room?: IRoom;

  @observable
  public game: IChessGame = {
    pgn: undefined,
    status: undefined
  };

  private wsStore: WsStore;

  constructor(wsStore: WsStore) {
    this.wsStore = wsStore;

    this.wsStore.on("@@rooms/list", e => {
      this.setRooms([]);
      console.log("list rooms", e, this);
    });
    this.wsStore.on("@@rooms/create", e => {
      console.log("create room", e, this);
    });
    this.wsStore.on("@@rooms/join", e => {
      console.log("join room", e, this);
    });
    this.wsStore.on("@@rooms/updateGame", e => {
      console.log("update game", e, this);
    });
  }

  @action
  public setCurrentRoom(room?: IRoom) {
    this.room = room;
  }

  @action
  public setRooms(rooms: IRoom[]) {
    this.rooms = rooms;
  }

  @action
  public addRoom(room: IRoom) {
    this.rooms = this.rooms.concat(room);
  }

  @action
  public setGame(game: IChessGame) {
    this.game = game;
  }

  @action
  public updateGame(game: Partial<IChessGame>) {
    this.game = {
      ...this.game,
      ...game
    };
  }
}
