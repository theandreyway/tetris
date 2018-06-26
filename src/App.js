import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Tetris } from "./components/container/Tetris.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Tetris/>

      </div>
    );
  }
}

/*
TODO:
Speed up side to side
increase speed with score
preview next shape
display game over
make background grid square borders lighter
make shape blocks prettier
*/

export default App;
