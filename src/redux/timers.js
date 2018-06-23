import { store, moveDown } from "./game.js"

class TimerStateBox {
  constructor(initialState) {
    this.state = initialState;
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
  }
}

const SPEED_TO_MILLIS = [600, 500, 400, 300, 200, 150, 100, 80, 60];

const INITIAL_TIMERS_STATE = {
  autoDownMillis: -1,

  autoDown: undefined,
  down: undefined,
  left: undefined,
  right: undefined
}

const START_DOWN = "START_DOWN";
const START_LEFT = "START_LEFT";
const START_RIGHT = "START_RIGHT";

const STOP_DOWN = "STOP_DOWN";
const STOP_LEFT = "STOP_LEFT";
const STOP_RIGHT = "STOP_RIGHT";

const INIT_TIMERS = "INIT_TIMERS";


function convertScoreToInterval(score) {
  const index = Math.min(Math.floor(score), SPEED_TO_MILLIS.length - 1);
  return SPEED_TO_MILLIS[index];
}


function updateSpeedIfItChanged() {
  const autoDownMillis = convertScoreToInterval(store.getState().score);
  if (timers.state.autoDownMillis !== autoDownMillis) {
    clearInterval(timers.state.autoDown);
    timers.state = {...timers.state,
      autoDownMillis: autoDownMillis,
      autoDown: setInterval(autoDownTick, autoDownMillis)
    };
  }
}

function autoDownTick() {
  updateSpeedIfItChanged();
  store.dispatch(moveDown());
}

export function reduceInitTimers(state, autoDownMillis) {
  return {
    ...state,
    autoDownMillis: autoDownMillis,
    autoDown: setInterval(autoDownTick, autoDownMillis)
  }
}

export function doClearTimers(state) {
  clearInterval(state.autoDown);
  clearInterval(state.down);
  clearInterval(state.left);
  clearInterval(state.right);
}

export const timers = new TimerStateBox(INITIAL_TIMERS_STATE);
