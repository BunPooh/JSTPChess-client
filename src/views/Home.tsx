import { computed } from "mobx";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import * as React from "react";
import { routes } from "src/router/config";
import { UserStore } from "src/store/UserStore";

interface IComponentProps {
  routerStore: RouterStore;
  userStore: UserStore;
}

@inject("routerStore", "userStore")
@observer
export default class Home extends React.Component<IComponentProps> {
  @computed
  private get user() {
    return this.props.userStore.user;
  }

  public render() {
    return (
      <div>
        <h2>Our Home</h2>
        <button onClick={this.handleGoogleLogin}>Login with google</button>
        <button onClick={this.handleLogout}>Logout</button>

        <div>{this.user ? this.user.displayName : ""}</div>
      </div>
    );
  }

  private handleGoogleLogin = async () => {
    try {
      await this.props.userStore.signInWithProvider("google");
    } catch (err) {
      console.error("google login", err);
    }
  };
  private handleLogout = async () => {
    try {
      await this.props.userStore.signOut();
    } catch (err) {
      console.error("logout", err);
    }
  };
}
