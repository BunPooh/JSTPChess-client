import { Button } from "antd";
import { computed } from "mobx";
import { observer } from "mobx-react";
import * as PropTypes from "prop-types";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import Chessboard from "../../components/Chessboard";
import { RoomStore } from "../../store/RoomStore";
import { UserStore } from "../../store/UserStore";

interface IComponentProps {
  roomStore: RoomStore;
  userStore: UserStore;
}

@observer
export default class LobbyRoom extends React.Component<IComponentProps> {
  public static propTypes = {
    roomStore: PropTypes.instanceOf(RoomStore).isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired
  };

  constructor(props: IComponentProps) {
    super(props);
  }

  public quitRoom = () => {
    this.props.roomStore.quitRoom();
  };

  public render() {
    const room = this.props.roomStore.room!;
    const user = this.props.userStore.user!;
    const opponent =
      room.creator!.id === user.uid ? room.opponent! : room.creator;

    return (
      <div>
        <h2 className="title-style1 text-center mb-4">
          <FormattedMessage id="lobby.playing" /> {opponent.id}
        </h2>

        <div>
          <div>{this.status}</div>
          <div>
            <Chessboard
              playerColor="w"
              pgn={this.pgn}
              onMovePiece={this.onMovePiece}
              onChangePositions={this.onChangePositions}
              onChangeStatus={this.onChangeStatus}
            />
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

  @computed
  private get pgn() {
    return this.props.roomStore!.game.pgn;
  }

  @computed
  private get status() {
    return this.props.roomStore!.game.status;
  }

  private onMovePiece = (from: string, to: string) => {};

  private onChangePositions = (pgn: string) => {
    this.props.roomStore!.updateGame({
      pgn
    });
  };

  private onChangeStatus = (status: string) => {
    this.props.roomStore!.updateGame({
      status
    });
  };
}
