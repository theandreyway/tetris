import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { store,
  init,
  moveDown, moveLeft, moveRight,
  rotateRight } from './redux/actions.js';

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

class Game extends Component {
  componentDidMount() {
    store.dispatch(init(Date.now()));
  }

  render() {
    return (
      <div tabIndex={0} onKeyDown={this.props.onKeyDown}>
        <p>seed is {this.props.seed}</p>
        <Board rows={this.props.board} />
      </div>
    )
  }
}

const mapStateProps = state => {
  let board = state.board.map(a => a.map(b => b))

  const shape = state.shape.shape;
  const top = state.shape.top;
  const left = state.shape.left;
  const right = state.shape.right;
  const p = state.position;

  for (let r = top; r < shape.length; r++) {
    for (let c = left; c < shape[0].length - right; c++) {
      board[p.row + r][p.col + c] = shape[r][c];
    }
  }

  return {
    board: board,
    seed: state.seed
  }
}

const mapDisptchToProps = dispatch => {
  return {
    onKeyDown: e => {
      switch (e.key) {
        case "ArrowDown":
          dispatch(moveDown());
          break;
        case "ArrowLeft":
          dispatch(moveLeft());
          break;
        case "ArrowRight":
          dispatch(moveRight());
          break;
        case "ArrowUp":
          dispatch(rotateRight());
          break;
        default:
          break;
      }
    }
  }
}

const PlayableGame = connect(mapStateProps, mapDisptchToProps)(Game)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>

          <PlayableGame/>

        </div>
      </Provider>
    );
  }
}

export default App;
