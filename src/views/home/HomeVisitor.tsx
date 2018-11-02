import { Alert, Button, Card } from "antd";
import * as PropTypes from "prop-types";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { IAuthError } from "src/services/auth";
import { UserStore } from "src/store/UserStore";

interface IComponentProps {
  userStore: UserStore;
}

interface IComponentState {
  authErrorCode?: string;
}

export default class HomeVisitor extends React.Component<
  IComponentProps,
  IComponentState
> {
  public static propTypes = {
    userStore: PropTypes.instanceOf(UserStore).isRequired
  };

  constructor(props: IComponentProps) {
    super(props);

    this.state = {
      authErrorCode: undefined
    };
  }

  public render() {
    return (
      <div className="Home row d-flex justify-content-center align-items-center">
        <Card className="col-12 col-sm-11 col-md-10 col-lg-8">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-8">
              <h2 className="title-style1 text-center">
                <FormattedMessage id="about.title" />
              </h2>
              <p className="text-center text-sm-left">
                <FormattedMessage id="about.content" />
              </p>
            </div>
            <div className="col-12 col-sm-6 col-md-4 d-flex flex-column align-items-center">
              <h2 className="title-style1">
                <FormattedMessage id="title.playNow" />
              </h2>
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

          <div className="row">
            <div className="col-12">
              {this.state.authErrorCode ? (
                <Alert
                  className="mt-3"
                  message={
                    <FormattedMessage
                      id={`firebase.${this.state.authErrorCode}`}
                    />
                  }
                  type="error"
                  showIcon={true}
                />
              ) : null}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  private handleGoogleLogin = async () => {
    try {
      await this.props.userStore.signInWithProvider("google");
    } catch (err) {
      const authError = err as IAuthError;
      this.setState({
        authErrorCode: authError.code
      });
    }
  };

  private handleFacebookLogin = async () => {
    try {
      await this.props.userStore.signInWithProvider("facebook");
    } catch (err) {
      const authError = err as IAuthError;
      this.setState({
        authErrorCode: authError.code
      });
    }
  };
}
