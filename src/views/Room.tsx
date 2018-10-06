import * as React from "react";

import Chessboard from "../components/Chessboard";

interface IComponentState {
  positions?: string;
  status?: string;
}

export default class Room extends React.Component<{}, IComponentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      positions: undefined,
      status: undefined
    };
  }

  public render() {
    return (
      <div>
        <h2>Our Room</h2>
        <div>{this.state.status}</div>
        <div>
          <Chessboard
            playerColor="w"
            pgn={this.state.positions}
            onChangePositions={this.onChangePositions}
            onChangeStatus={this.onChangeStatus}
          />
        </div>
      </div>
    );
  }

  private onChangePositions = (positions: string) => {
    this.setState({
      positions
    });
  };

  private onChangeStatus = (status: string) => {
    this.setState({
      status
    });
  };
}
