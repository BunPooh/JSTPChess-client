import "./Lobby.css";

import { Card } from "antd";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import * as PropTypes from "prop-types";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { routes } from "src/router/config";
import { RoomStore } from "src/store/RoomStore";
import { UserStore } from "src/store/UserStore";

import { LobbyTable } from "./LobbyTable";

interface IComponentProps {
  roomStore: RoomStore;
  routerStore: RouterStore;
  userStore: UserStore;
}

@inject("roomStore", "routerStore", "userStore")
@observer
export default class Lobby extends React.Component<IComponentProps, {}> {
  public static propTypes = {
    roomStore: PropTypes.instanceOf(RoomStore).isRequired,
    routerStore: PropTypes.instanceOf(RouterStore).isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired
  };

  public enterRoom = () => {
    this.props.roomStore.setRoom({
      id: "myid",
      players: []
    });
    this.props.routerStore.push(routes.room);
  };

  public render() {
    const data = [
      {
        uid: "1",
        name: "1"
      },
      {
        uid: "2",
        name: "2"
      },
      {
        uid: "3",
        name: "3"
      },
      {
        uid: "4",
        name: "4"
      },
      {
        uid: "5",
        name: "5"
      },
      {
        uid: "6",
        name: "6"
      }
    ];

    return (
      <div className="Lobby row d-flex justify-content-center align-items-center">
        <Card className="col-12 col-sm-11 col-md-10 col-lg-8 mb-4">
          <div>
            <h2 className="title-style1 text-center mb-4">
              <FormattedMessage id="lobby.title" />
            </h2>
            <LobbyTable data={data} />
            <button onClick={this.enterRoom}>Enter room (local)</button>
            <Link to="/">Home</Link>
          </div>
        </Card>
      </div>
    );
  }
}
