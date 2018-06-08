import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { store, init } from './redux/actions.js';

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
      <div>
        <p>seed is {this.props.seed}</p>
        <Board rows={this.props.board} />
      </div>
    )
  }
}

const mapStateProps = state => {
  return {
    board: state.board,
    seed: state.seed
  }
}

const PlayableGame = connect(mapStateProps)(Game)

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
