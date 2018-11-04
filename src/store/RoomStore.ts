import { action, observable } from "mobx";

import { WsStore } from "./WsStore";

export type PlayerColor = "w" | "b";

export interface IPlayer {
  id: string;
}

export interface IRoom {
  id: string;
  creator: IPlayer;
  opponent?: IPlayer;
}

export interface IChessGame {
  pgn?: string;
  status?: string;
}

export class RoomStore {
  @observable
  public _rooms: IRoom[] = [];

  @observable
  public _room?: IRoom;

  @observable
  public _game: IChessGame = {
    pgn: undefined,
    status: undefined
  };

  public get rooms() {
    return this._rooms;
  }

  public get room() {
    return this._room;
  }

  public get game() {
    return this._game;
  }

  private wsStore: WsStore;

  constructor(wsStore: WsStore) {
    this.wsStore = wsStore;

    this.wsStore.on("@@rooms/list", (data: IRoom[]) => {
      this.setRooms(data);
    });
    this.wsStore.on("@@rooms/set", (data: IRoom & { chessBoard: string }) => {
      this.setCurrentRoom({
        id: data.id,
        creator: data.creator,
        opponent: data.opponent
      });
      this.updateGame({
        pgn: data.chessBoard
      });
    });
    this.wsStore.on("@@rooms/leave", e => {
      this.setCurrentRoom(undefined);
    });
  }

  public listRooms() {
    this.wsStore.emit("@@rooms/list");
  }
  public createRoom() {
    this.wsStore.emit("@@rooms/create");
  }
  public joinRoom(roomId: string) {
    this.wsStore.emit("@@rooms/join", roomId);
  }
  public quitRoom() {
    this.wsStore.emit("@@rooms/leave");
  }
  public movePiece(from: string, to: string) {
    this.wsStore.emit("@@chess/move", {
      from,
      to
    });
  }

  @action
  public updateGame(game: Partial<IChessGame>) {
    this._game = {
      ...this.game,
      ...game
    };
  }

  @action
  private setCurrentRoom(room?: IRoom) {
    this._room = room;
  }

  @action
  private setRooms(rooms: IRoom[]) {
    this._rooms = rooms;
  }
}
