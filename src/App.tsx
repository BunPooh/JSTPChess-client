import "./App.css";

import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { Background } from "./components/Background";
import { routes } from "./router/config";
import Home from "./views/home/Home";
import Lobby from "./views/lobby/Lobby";
import { Navbar } from "./views/navbar/Navbar";
import NotFound from "./views/NotFound";
import Room from "./views/room/Room";
import { WebsocketConnection } from "./views/WebsocketConnection";

interface IComponentProps {}

class App extends React.Component<IComponentProps> {
  public render() {
    return (
      <div className="App">
        <Background />
        <div className="App-content">
          <div className="App-top">
            <WebsocketConnection />
            <Navbar />
          </div>

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
