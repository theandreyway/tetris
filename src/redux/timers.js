import { store, moveDown, moveLeft, moveRight } from "./game.js"

class TimerStateBox {
  constructor(initialState) {
    this.state = initialState;
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    console.log(newState);
    this._state = newState;
  }
}

const ACTION_MILLIS = 60;
const SPEED_TO_MILLIS = [600, 500, 400, 300, 200, 150, 100, 80, 60, 40, 30];

const INITIAL_TIMERS_STATE = {
  autoDownMillis: -1,

  autoDown: undefined,
  down: undefined,
  left: undefined,
  right: undefined
}

export function reduceStartLeft(state) {
  if (state.left) {
    return state;
  }

  if (state.right) {
    clearInterval(state.right);
  }

  return {
    ...state,
    left: setInterval(() => store.dispatch(moveLeft()), ACTION_MILLIS),
    right: undefined
  }
}

export function reduceStartRight(state) {
  if (state.right) {
    return state;
  }

  if (state.left) {
    clearInterval(state.left);
  }

  return {
    ...state,
    left: undefined,
    right: setInterval(() => store.dispatch(moveRight()), ACTION_MILLIS)
  }
}

export function reduceStartDown(state) {
  if (state.down) {
    return state;
  }

  if (state.autoDown) {
    clearInterval(state.autoDown);
  }

  return {
    ...state,
    autoDown: undefined,
    down: setInterval(() => store.dispatch(moveDown()), ACTION_MILLIS)
  }
}

export function reduceStopLeftRight(state) {
    if (state.left) {
      clearInterval(state.left);
    }

    if (state.right) {
      clearInterval(state.right);
    }

    return {
      ...state,
      left: undefined,
      right: undefined
    };
}

export function reduceStopDown(state) {
  console.log("stop down");
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

function convertScoreToInterval(score) {
  const index = Math.min(Math.floor(score), SPEED_TO_MILLIS.length - 1);
  return SPEED_TO_MILLIS[index];
}

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

export function clearTimers(state) {
  clearInterval(state.autoDown);
  clearInterval(state.down);
  clearInterval(state.left);
  clearInterval(state.right);
}
