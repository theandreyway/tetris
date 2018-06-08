import { createStore } from "redux"

const ActionType = {
  INIT: "INIT"
}

export function init(seed) {
  return { type: ActionType.INIT, seed: seed };
}

function makeBlankBoard(numRows, numCols) {
  let rows = Array(numRows)
  for (let r = 0; r < numRows; r++) {
    rows[r] = Array(numCols);
    for (let c = 0; c < numCols; c++) {
      rows[r][c] = false;
    }
  }

  return rows;
}

const initialState = {
  board: makeBlankBoard(20, 10),
  seed: -1
}

function reduceInit(state, seed) {
  return {...state,
    board: makeBlankBoard(20, 10),
    seed: seed
  };
}

function game(state = initialState, action) {
  switch (action.type) {
    case ActionType.INIT:
      return reduceInit(state, action.seed);
    default:
      return state;
  }
}

export const store = createStore(game)
