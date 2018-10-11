import { inject, observer } from "mobx-react";
import * as React from "react";

import { FlashConnectionError } from "../components/FlashConnectionError";
import { WsStore } from "../store/WsStore";

interface IComponentProps {
  wsStore?: WsStore;
}

@inject("wsStore")
@observer
export class WebsocketConnection extends React.Component<IComponentProps> {
  public handleConnection = () => {
    this.props.wsStore!.connect("http://localhost:3001");
  };

  public componentDidMount() {
    this.handleConnection();
  }

  public componentWillUnmount() {
    this.props.wsStore!.disconnect();
  }

  public render() {
    return (
      <div>
        <FlashConnectionError message={this.props.wsStore!.connectionError} />
      </div>
    );
  }
}
