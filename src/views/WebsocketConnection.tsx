import "../components/Flash.css";
import "./WebsocketConnection.css";

import { Button } from "antd";
import { computed } from "mobx";
import { inject, observer } from "mobx-react";
import * as PropTypes from "prop-types";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import * as config from "../config";
import { UserStore } from "../store/UserStore";
import { WsStore } from "../store/WsStore";

interface IComponentProps {
  wsStore?: WsStore;
  userStore?: UserStore;
}

@inject("wsStore", "userStore")
@observer
export class WebsocketConnection extends React.Component<IComponentProps> {
  public static propTypes = {
    wsStore: PropTypes.instanceOf(WsStore).isRequired,
    userStore: PropTypes.instanceOf(UserStore).isRequired
  };

  @computed
  public get errorCode() {
    return this.props.wsStore!.connectionError;
  }

  public componentDidMount() {
    this.props.userStore!.on("connect", this.onConnect);
    this.props.userStore!.on("disconnect", this.onDisconnect);
  }

  public componentWillUnmount() {
    this.props.userStore!.off("connect", this.onConnect);
    this.props.userStore!.off("disconnect", this.onDisconnect);
  }

  public render() {
    const code = this.errorCode;
    if (!code || !this.props.userStore!.isAuthenticated) {
      return null;
    }
    const actions = this.props.wsStore!.reconnectFailed ? (
      <div className="flash-actions">
        <Button className="btn btn-sm btn-retry" onClick={this.onConnect}>
          Retry
        </Button>
      </div>
    ) : null;

    return (
      <div className="flash flash-error text-center">
        {actions}
        <FormattedMessage id={`connection.${code}`} />
      </div>
    );
  }

  private onConnect = () => {
    this.props.wsStore!.connect(
      config.apiUrl,
      {
        query: {
          token: this.props.userStore!.token
        }
      }
    );
  };
  private onDisconnect = () => {
    this.props.wsStore!.disconnect();
  };
}
