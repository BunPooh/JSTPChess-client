import "./Lobby.css";

import { Card } from "antd";
import { inject, observer } from "mobx-react";
import * as PropTypes from "prop-types";
import * as React from "react";
import { RoomStore } from "src/store/RoomStore";
import { UserStore } from "src/store/UserStore";
import { WsStore } from "src/store/WsStore";

import LobbyList from "./LobbyList";
import LobbyRoom from "./LobbyRoom";
import LobbyWaiting from "./LobbyWaiting";

interface IComponentProps {
  roomStore: RoomStore;
  userStore: UserStore;
  wsStore: WsStore;
}

@inject("roomStore", "userStore", "wsStore")
@observer
export default class Lobby extends React.Component<IComponentProps> {
  public static propTypes = {
    roomStore: PropTypes.instanceOf(RoomStore).isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired,
    wsStore: PropTypes.instanceOf(WsStore).isRequired
  };

  public getComponent() {
    const currentRoom = this.props.roomStore.room;
    if (currentRoom && currentRoom.opponent) {
      return (
        <LobbyRoom
          roomStore={this.props.roomStore}
          userStore={this.props.userStore}
        />
      );
    }
    if (currentRoom) {
      return <LobbyWaiting roomStore={this.props.roomStore} />;
    }
    return (
      <LobbyList
        roomStore={this.props.roomStore}
        userStore={this.props.userStore}
        wsStore={this.props.wsStore}
      />
    );
  }

  public render() {
    const component = this.getComponent();

    return (
      <div className="Lobby row d-flex justify-content-center align-items-center">
        <Card className="col-12 col-sm-11 col-md-10 col-lg-8 mb-4">
          {component}
        </Card>
      </div>
    );
  }
}
