import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { store,
  initGame, moveLeft, moveRight, moveDown, drop,
  rotateRight, mapStateProps
} from './redux/game.js';
import {
  INITIAL_TIMERS_STATE,
  reduceInitTimers, doClearTimers
} from "./redux/timers.js"
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
  constructor(props) {
    super(props);
    this.state = INITIAL_TIMERS_STATE;
  }

  componentDidMount() {
    store.dispatch(initGame(Date.now()));
    const autoDownInterval = 600 / (store.getState().score + 1 % 10);
    this.setState(reduceInitTimers(this.state, autoDownInterval));
  }

  componentWillUnmount() {
    doClearTimers(this.state);
  }

  render() {
    return (
      <div tabIndex={0}
            onKeyDown={this.props.onKeyDown}
            onKeyUp={this.props.onKeyUp}>
        <p>seed is {this.props.seed}</p>
        <Board rows={this.props.board} />
      </div>
    )
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
        case " ":
          dispatch(drop());
          break;
        default:
          break;
      }
      e.stopPropagation();
      e.preventDefault();
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
