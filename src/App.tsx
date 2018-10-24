import "./App.css";

import * as React from "react";
import { Link, Route, Switch } from "react-router-dom";

import { Background } from "./components/Background";
import { routes } from "./router/config";
import Home from "./views/Home";
import Lobby from "./views/Lobby";
import { Navbar } from "./views/Navbar";
import NotFound from "./views/NotFound";
import Room from "./views/Room";
import { WebsocketConnection } from "./views/WebsocketConnection";

interface IComponentProps {}

class App extends React.Component<IComponentProps> {
  public render() {
    return (
      <div className="App">
        <Background />
        <div className="App-content">
          <Navbar />

          {/* <WebsocketConnection /> */}
          <Switch>
            <Route exact={true} path={routes.home} component={Home} />
            <Route path={routes.lobby} component={Lobby} />
            <Route path={routes.room} component={Room} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
