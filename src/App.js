import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Board(props) {
  let rows = []
  for (let i = 0; i < props.rows; i++) {
    rows.push(<BoardRow key={i} cols={props.cols}/>);
  }
  return (
    <div className="board">
      {rows}
    </div>
  )
}

function BoardRow(props) {
  let cells = []
  for (let i = 0; i < props.cols; i++) {
    cells.push(<BoardCell key={i}/>);
  }

  return (
    <div className="row">
      {cells}
    </div>
  )
}

function BoardCell(props) {
  return <div className="cell"/>
}

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
        <div>
          <div className="board">
            <div className="row">
              <div className="cell"/>
              <div className="cell on"/>
              <div className="cell"/>
            </div>
            <div className="row">
              <div className="cell"/>
              <div className="cell"/>
              <div className="cell"/>
            </div>
          </div>
        </div>
        <Board rows="10" cols="8"/>
      </div>
    );
  }
}

export default App;
