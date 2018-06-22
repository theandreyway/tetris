import { store, moveDown } from "./game.js"

export const INITIAL_TIMERS_STATE = {
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

export function reduceInitTimers(state, autoDownMillis) {
  const timerId = setInterval(() => store.dispatch(moveDown()), autoDownMillis);
  return {...state, autoDown: timerId };
}

export function doClearTimers(state) {
  clearInterval(state.autoDown);
  clearInterval(state.down);
  clearInterval(state.left);
  clearInterval(state.right);
}
