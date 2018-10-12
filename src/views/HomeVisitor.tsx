import { Button, Card } from "antd";
import * as React from "react";
import { UserStore } from "src/store/UserStore";

interface IComponentProps {
  userStore: UserStore;
}

export default class HomeVisitor extends React.Component<IComponentProps> {
  public render() {
    return (
      <div className="Home row d-flex justify-content-center align-items-center">
        <Card className="col-12 col-sm-11 col-md-10 col-lg-8">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-8">
              <h2 className="title-style1 text-center">About</h2>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Repellat atque sint dolor accusantium quisquam porro. Eius sequi
                error pariatur non explicabo, molestias doloremque dolore!
                Laudantium recusandae eum perferendis odit magnam!
              </p>
            </div>
            <div className="col-12 col-sm-6 col-md-4 d-flex flex-column align-items-center">
              <h2 className="title-style1">Play now</h2>
              <Button
                type="danger"
                className="btn-danger btn btn-sm login-google btn-login my-2"
                onClick={this.handleGoogleLogin}
              >
                Google
              </Button>

              <Button
                type="primary"
                className="btn btn-sm login-facebook btn-login my-2"
                onClick={this.handleFacebookLogin}
              >
                Facebook
              </Button>
            </div>
          </div>

          {/* <ul>
            <li>
              <Link to={routes.home}>Home</Link>
            </li>
            <li>
              <Link to={routes.lobby}>Lobby</Link>
            </li>
            <li>
              <Link to={routes.room}>Room</Link>
            </li>
          </ul> */}
        </Card>
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

  private handleFacebookLogin = async () => {
    try {
      await this.props.userStore.signInWithProvider("facebook");
    } catch (err) {
      console.error("facebook login", err);
    }
  };
}
