import { computed } from "mobx";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import * as PropTypes from "prop-types";
import * as React from "react";
import { routes } from "src/router/config";
import { RoomStore } from "src/store/RoomStore";

import Chessboard from "../../components/Chessboard";

interface IComponentState {}

interface IComponentProps {
  roomStore: RoomStore;
  routerStore: RouterStore;
}

@inject("roomStore", "routerStore")
@observer
export default class Room extends React.Component<
  IComponentProps,
  IComponentState
> {
  public static propTypes = {
    roomStore: PropTypes.instanceOf(RoomStore).isRequired,
    routerStore: PropTypes.instanceOf(RouterStore).isRequired
  };

  @computed
  private get pgn() {
    return this.props.roomStore.game.pgn;
  }

  @computed
  private get status() {
    return this.props.roomStore.game.status;
  }

  constructor(props: IComponentProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <h2>Our Room</h2>
        <div>{this.status}</div>
        <div>
          <Chessboard
            playerColor="w"
            pgn={this.pgn}
            onChangePositions={this.onChangePositions}
            onChangeStatus={this.onChangeStatus}
          />
        </div>
      </div>
    );
  }

  public componentWillMount() {
    if (!this.props.roomStore.room) {
      this.props.routerStore.push(routes.lobby);
    }
  }

  private onChangePositions = (pgn: string) => {
    this.props.roomStore.updateGame({
      pgn
    });
  };

  private onChangeStatus = (status: string) => {
    this.props.roomStore.updateGame({
      status
    });
  };
}
