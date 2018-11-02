import "./Home.css";

import { computed } from "mobx";
import { inject, observer } from "mobx-react";
import * as PropTypes from "prop-types";
import * as React from "react";
import { UserStore } from "src/store/UserStore";

import HomeUser from "./HomeUser";
import HomeVisitor from "./HomeVisitor";

interface IComponentProps {
  userStore: UserStore;
}

@inject("userStore")
@observer
export default class Home extends React.Component<IComponentProps> {
  public static propTypes = {
    userStore: PropTypes.instanceOf(UserStore).isRequired
  };

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
