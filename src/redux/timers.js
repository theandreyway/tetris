import {
  store,
  moveDown, moveLeft, moveRight
} from "./game.js"

import {
  convertScoreToInterval
} from "./speed.js"

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

const ACTION_MILLIS = 50;
const LEFT = "LEFT";
const RIGHT = "RIGHT";

const INITIAL_TIMERS_STATE = {
  autoDownMillis: -1,
  leftRightPressCount: 0,
  leftRight: undefined,
  direction: undefined,

  autoDown: undefined,
  down: undefined,
}

export function reduceStartLeft(state) {
  if (state.direction === LEFT) {
    return state;
  }

  if (state.leftRight) {
    clearInterval(state.leftRight);
  }

  return {
    ...state,
    direction: LEFT,
    leftRight: setInterval(moveLeftTick, ACTION_MILLIS),
    leftRightPressCount: state.leftRightPressCount + 1
  }
}

export function reduceStartRight(state) {
  if (state.direction === RIGHT) {
    return state;
  }

  if (state.leftRight) {
    clearInterval(state.leftRight);
  }

  return {
    ...state,
    direction: RIGHT,
    leftRight: setInterval(moveRightTick, ACTION_MILLIS),
    leftRightPressCount: state.leftRightPressCount + 1
  }
}

export function reduceStopLeft(state) {
    clearInterval(state.leftRight);

    return {
      ...state,
      leftRight: state.leftRightPressCount === 2 ? setInterval(moveRightTick, ACTION_MILLIS) : undefined,
      direction: state.leftRightPressCount === 2 ? RIGHT : undefined,
      leftRightPressCount: state.leftRightPressCount - 1
    };
}


export function reduceStopRight(state) {
    clearInterval(state.leftRight);

    return {
      ...state,
      leftRight: state.leftRightPressCount === 2 ? setInterval(moveLeftTick, ACTION_MILLIS) : undefined,
      direction: state.leftRightPressCount === 2 ? LEFT : undefined,
      leftRightPressCount: state.leftRightPressCount - 1
    };
}

export function reduceStartDown(state) {
  if (state.down) {
    return state;
  }

  if (state.autoDown) {
    clearInterval(state.autoDown);
  }

  const downMillis = Math.min(ACTION_MILLIS, state.autoDownMillis);

  return {
    ...state,
    autoDown: undefined,
    down: setInterval(moveDownTick, downMillis)
  }
}

export function reduceStopDown(state) {
  if (state.down) {
    clearInterval(state.down);
  }

  return reduceAutoDown({ ...state, down: undefined });
}

export function reduceAutoDown(state) {
  const autoDownMillis = convertScoreToInterval(store.getState().score);
  return {
    ...state,
    autoDownMillis: autoDownMillis,
    autoDown: setInterval(autoDownTick, autoDownMillis)
  }
}

export const timers = new TimerStateBox(INITIAL_TIMERS_STATE);

function updateSpeedIfItChanged() {
  const autoDownMillis = convertScoreToInterval(store.getState().score);
  if (timers.state.autoDownMillis !== autoDownMillis) {
    clearInterval(timers.state.autoDown);
    timers.state = reduceAutoDown(timers.state);
  }
}

function autoDownTick() {
  updateSpeedIfItChanged();
  store.dispatch(moveDown());
}

function moveLeftTick() {
  store.dispatch(moveLeft());
}


function moveRightTick() {
  store.dispatch(moveRight());
}

function moveDownTick() {
  store.dispatch(moveDown());
}

export function clearTimers(state) {
  clearInterval(state.autoDown);
  clearInterval(state.down);
  clearInterval(state.left);
  clearInterval(state.right);
}
