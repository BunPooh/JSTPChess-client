import { Alert, Button } from "antd";
import { observer } from "mobx-react";
import * as PropTypes from "prop-types";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { IRoom, RoomStore } from "../../store/RoomStore";
import { UserStore } from "../../store/UserStore";
import { WsStore } from "../../store/WsStore";
import { LobbyTable } from "./LobbyTable";

interface IComponentProps {
  roomStore: RoomStore;
  userStore: UserStore;
  wsStore: WsStore;
}

@observer
export default class LobbyList extends React.Component<IComponentProps> {
  public static propTypes = {
    roomStore: PropTypes.instanceOf(RoomStore).isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired,
    wsStore: PropTypes.instanceOf(WsStore).isRequired
  };

  constructor(props: IComponentProps) {
    super(props);
  }

  public createRoom = () => {
    this.props.roomStore.createRoom();
  };

  public listRoom = () => {
    this.props.roomStore.listRooms();
  };

  public joinRoom = (room: IRoom) => {
    this.props.roomStore.joinRoom(room.id);
  };

  public quitRoom = () => {
    this.props.roomStore.quitRoom();
  };

  public componentDidMount() {
    const ws = this.props.wsStore;
    if (ws.connected) {
      this.listRoom();
    }
    ws.on("connect", this.listRoom);
  }

  public componentWillUnmount() {
    this.props.wsStore!.off("connect", this.listRoom);
  }

  public render() {
    const data: IRoom[] = this.props.roomStore.rooms;
    const websocketIsConnected = this.props.wsStore.connected;

    const alert = (
      <Alert
        type="error"
        showIcon={true}
        message={<FormattedMessage id="connection.required" />}
      />
    );
    const content = websocketIsConnected ? (
      <LobbyTable data={data} onClickPlay={this.joinRoom} />
    ) : (
      alert
    );

    return (
      <div>
        <h2 className="title-style1 text-center mb-4">
          <FormattedMessage id="lobby.title" />
        </h2>

        {content}

        <div className="row mt-3">
          <div className="col-12 col-sm-6 col-md-4 mb-3">
            <Button className="btn btn-sm btn-block" onClick={this.listRoom}>
              Refresh
            </Button>
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-3">
            <Button className="btn btn-sm btn-block" onClick={this.createRoom}>
              Create
            </Button>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <Button className="btn btn-sm btn-block">
              <Link to="/">Back</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
