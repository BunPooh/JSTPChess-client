import { Button } from "antd";
import * as PropTypes from "prop-types";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import { RoomStore } from "../../store/RoomStore";

interface IComponentProps {
  roomStore: RoomStore;
}

export default class LobbyWaiting extends React.Component<IComponentProps> {
  public static propTypes = {
    roomStore: PropTypes.instanceOf(RoomStore).isRequired
  };

  public quitRoom = () => {
    this.props.roomStore.quitRoom();
  };

  public render() {
    return (
      <div>
        <h2 className="title-style1 text-center mb-4">
          <FormattedMessage id="lobby.waiting" />
        </h2>

        <div className="Lobby--loading">
          <div className="spinner">
            <div className="double-bounce1" />
            <div className="double-bounce2" />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 mb-3">
            <Button className="btn btn-sm btn-block" onClick={this.quitRoom}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
