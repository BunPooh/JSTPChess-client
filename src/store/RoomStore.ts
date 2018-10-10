import { action, observable } from "mobx";

import { IUser } from "./UserStore";

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
  public room?: IRoom;

  @observable
  public game: IChessGame = {
    pgn: undefined,
    status: undefined
  };

  @action
  public setRoom(room?: IRoom) {
    this.room = room;
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
