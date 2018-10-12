import "./Home.css";

import { computed } from "mobx";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import * as React from "react";
import { UserStore } from "src/store/UserStore";

import HomeUser from "./HomeUser";
import HomeVisitor from "./HomeVisitor";

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
    if (!this.user) {
      return <HomeVisitor userStore={this.props.userStore} />;
    }
    return <HomeUser userStore={this.props.userStore} />;
  }
}
