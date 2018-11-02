import "./Lobby.css";

import { Alert, Card } from "antd";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import * as PropTypes from "prop-types";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { routes } from "src/router/config";
import { RoomStore } from "src/store/RoomStore";
import { UserStore } from "src/store/UserStore";
import { WsStore } from "src/store/WsStore";

import { LobbyTable } from "./LobbyTable";

interface IComponentProps {
  roomStore: RoomStore;
  routerStore: RouterStore;
  userStore: UserStore;
  wsStore: WsStore;
}

@inject("roomStore", "routerStore", "userStore", "wsStore")
@observer
export default class Lobby extends React.Component<IComponentProps, {}> {
  public static propTypes = {
    roomStore: PropTypes.instanceOf(RoomStore).isRequired,
    routerStore: PropTypes.instanceOf(RouterStore).isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired,
    wsStore: PropTypes.instanceOf(WsStore).isRequired
  };

  public enterRoom = () => {
    this.props.roomStore.setCurrentRoom({
      id: "myid",
      players: []
    });
    this.props.routerStore.push(routes.room);
  };

  public componentDidMount() {
    const ws = this.props.wsStore;
    if (ws.connected) {
      ws.emit("@@rooms/list");
    }
    ws.on("connect", this.onConnect);
  }

  public onConnect = () => {
    console.log("lobby connected to server");
    this.props.wsStore.emit("@@room/list");
  };

  public componentWillUnmount() {
    this.props.wsStore.off("connect", this.onConnect);
  }

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

    const websocketIsConnected = this.props.wsStore.connected;

    return (
      <div className="Lobby row d-flex justify-content-center align-items-center">
        <Card className="col-12 col-sm-11 col-md-10 col-lg-8 mb-4">
          <div>
            <h2 className="title-style1 text-center mb-4">
              <FormattedMessage id="lobby.title" />
            </h2>

            {websocketIsConnected ? (
              <LobbyTable data={data} />
            ) : (
              <div>
                <Alert
                  type="error"
                  showIcon={true}
                  message={<FormattedMessage id="connection.required" />}
                />
              </div>
            )}

            <button onClick={this.enterRoom}>Enter room (local)</button>
            <Link to="/">Home</Link>
          </div>
        </Card>
      </div>
    );
  }
}
