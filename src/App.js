import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { store,
  init, tick,
  startMove, stopMove,
  moveDown, drop,
  rotateRight, mapStateProps
} from './redux/actions.js';

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

class Speed extends Component {
  render() {

    return (
      <div>
        {this.props.speed}
      </div>
    )
  }
}

class Game extends Component {
  componentDidMount() {
    store.dispatch(init(Date.now()));
    this.timer = setInterval(() => store.dispatch(tick()), 10);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
          dispatch(startMove("down"));
          break;
        case "ArrowLeft":
          dispatch(startMove("left"));
          break;
        case "ArrowRight":
          dispatch(startMove("right"));
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
    },
    onKeyUp: e => {
      switch (e.key) {
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          dispatch(stopMove());
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
