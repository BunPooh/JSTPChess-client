import "./Lobby.css";

import { Button } from "antd";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import * as React from "react";
import { routes } from "src/router/config";
import { RoomStore } from "src/store/RoomStore";
import { UserStore } from "src/store/UserStore";

interface IComponentProps {
  roomStore: RoomStore;
  routerStore: RouterStore;
  userStore: UserStore;
}

@inject("roomStore", "routerStore", "userStore")
@observer
export default class Lobby extends React.Component<IComponentProps, {}> {
  public enterRoom = () => {
    this.props.roomStore.setRoom({
      id: "myid",
      players: []
    });
    this.props.routerStore.push(routes.room);
  };

  public render() {
    return (
      <div>
        <h2>Our Lobby</h2>
        <Button type="primary" onClick={this.enterRoom}>
          Enter room (Local)
        </Button>
      </div>
    );
  }
}
