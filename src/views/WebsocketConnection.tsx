import { inject, observer } from "mobx-react";
import * as React from "react";
import { FormattedMessage } from "react-intl";

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
    const code = this.props.wsStore!.connectionError;
    const message = code ? (
      <FormattedMessage id={`connection.${code}`} />
    ) : (
      undefined
    );

    return (
      <div>
        <FlashConnectionError message={message} />
      </div>
    );
  }
}
