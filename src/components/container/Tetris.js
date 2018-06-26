import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store, initGame } from "../../redux/game.js"
import { timers, reduceAutoDown, clearTimers } from "../../redux/timers.js"
import { InteractiveGame } from "./InteractiveGame.js"

export class Tetris extends Component {
  componentDidMount() {
    store.dispatch(initGame(Date.now()));
    timers.state = reduceAutoDown(timers.state);
  }

  componentWillUnmount() {
    clearTimers(timers.state);
  }

  render() {
    return (
      <Provider store={store}>
        <InteractiveGame />
      </Provider>
    )
  }
}
