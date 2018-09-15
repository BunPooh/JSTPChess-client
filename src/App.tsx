import './App.css';

import * as React from 'react';

import logoSvg from './logo.svg';

class App extends React.Component {
  public handleClick = () => {
    console.log(this);
  };

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logoSvg} className="App-logo" alt="logo" />
          <h1 className="App-title" onClick={this.handleClick}>
            Welcome to React
          </h1>
        </header>
        <p className="App-intro">Getting started!</p>
      </div>
    );
  }
}

export default App;
