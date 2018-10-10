import "./App.css";

import * as React from "react";
import { Link, Route, Switch } from "react-router-dom";

import { routes } from "./router/config";
import Home from "./views/Home";
// import logoSvg from './logo.svg';
import Lobby from "./views/Lobby";
import NotFound from "./views/NotFound";
import Room from "./views/Room";

class App extends React.Component {
  public handleClick = () => {
    console.log(this);
  };

  public render() {
    return (
      <div className="App">
        <p className="App-intro">Welcome to React</p>
        <ul>
          <li>
            <Link to={routes.home}>Home</Link>
          </li>
          <li>
            <Link to={routes.lobby}>Lobby</Link>
          </li>
          <li>
            <Link to={routes.room}>Room</Link>
          </li>
        </ul>

        <div>
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
