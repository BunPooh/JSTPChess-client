import { Avatar, Button, Card } from "antd";
import { computed } from "mobx";
import * as React from "react";
import { Link } from "react-router-dom";

import { routes } from "../router/config";
import { UserStore } from "../store/UserStore";

interface IComponentProps {
  userStore: UserStore;
}

export default class HomeUser extends React.Component<IComponentProps> {
  @computed
  private get user() {
    return this.props.userStore.user;
  }

  public render() {
    return (
      <div className="Home row d-flex justify-content-center align-items-center">
        <Card className="col-12 col-sm-11 col-md-10 col-lg-8">
          <h2 className="title-style1 text-center mb-4">Profile</h2>
          <div className="row">
            <div className="col-12 col-sm-7 my-3 d-flex align-items-center">
              <Avatar
                size={48}
                icon="user"
                src={this.user!.photoURL}
                className="mr-3"
              />
              <div>
                <p className="profile-name">{this.user!.displayName}</p>
                <p className="profile-email mb-0">{this.user!.email}</p>
              </div>
            </div>
            <div className="col-12 col-sm-5 d-flex my-3 justify-content-sm-end">
              <div>
                <Button type="primary" className="btn btn-sm logout mb-2">
                  <Link to={routes.lobby}>Lobby</Link>
                </Button>
                <Button
                  className="btn btn-sm logout"
                  onClick={this.handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  private handleLogout = async () => {
    try {
      await this.props.userStore.signOut();
    } catch (err) {
      console.error("logout", err);
    }
  };
}
