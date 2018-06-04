import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Board(props) {
  const rows = props.rows.map((row, i) => {
    return <BoardRow key={i} cells={row}/>;
  })

  return (
    <div className="board">
      {rows}
    </div>
  )
}

function BoardRow(props) {
  const cells = props.cells.map((value, i) => {
    return <BoardCell key={i} value={value}/>;
  })

  return (
    <div className="row">
      {cells}
    </div>
  )
}

function BoardCell(props) {
  const className = props.value ? "cell on" : "cell";
  return <div className={className}/>
}

class App extends Component {
  render() {
    const numRows = 12;
    const numCols = 8;

    let rows = Array(numRows)
    for (let r = 0; r < numRows; r++) {
      rows[r] = Array(numCols);
      for (let c = 0; c < numCols; c++) {
        rows[r][c] = false;
      }
    }

    rows[3][5] = true
    rows[4][4] = true

    const state = {
      rows: rows,
      score: 0
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Board rows={state.rows}/>
        
      </div>
    );
  }
}

export default App;
