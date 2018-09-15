import './App.css';

import * as React from 'react';
import { Link, Route } from 'react-router-dom';

// import logoSvg from './logo.svg';
import Lobby from './views/Lobby';
import Room from './views/Room';

class App extends React.Component {
  public handleClick = () => {
    console.log(this);
  };

  public render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logoSvg} className="App-logo" alt="logo" />
          <h1 className="App-title" onClick={this.handleClick}>
            Welcome to React
          </h1>
        </header> */}
        <p className="App-intro">Welcome to React</p>
        <ul>
          <li>
            <Link to="/">Lobby</Link>
          </li>
          <li>
            <Link to="/room">Room</Link>
          </li>
        </ul>

        <div>
          <Route exact={true} path="/" component={Lobby} />
          <Route path="/room" component={Room} />
        </div>
      </div>
    );
  }
}

export default App;
