import { createStore } from "redux"

const ActionType = {
  INIT: "INIT",
  MOVE_DOWN: "MOVE_DOWN",
  MOVE_LEFT: "MOVE_LEFT",
  MOVE_RIGHT: "MOVE_RIGHT"
}

export const SHAPE_ROTATIONS = [
  [
    [
      [1, 1],
      [1, 1]
    ]
  ],
  [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0]
    ]
  ],
  [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1]
    ]
  ],
  [
    [
      [0, 1, 1],
      [0, 0, 1],
      [0, 0, 1]
    ],
    [
      [0, 0, 0],
      [0, 0, 1],
      [1, 1, 1]
    ],
    [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0]
    ],
    [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0]
    ]
  ],
  [
    [
      [1, 1, 0],
      [1, 0, 0],
      [1, 0, 0]
    ],
    [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0]
    ],
    [
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1]
    ],
    [
      [0, 0, 0],
      [1, 0, 0],
      [1, 1, 1]
    ]
  ],
  [
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ],
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ]
].map(shape =>
  shape.map(rotation =>
    rotation.map(row =>
      row.map(col => col === 1))));

export function init(seed) {
  return { type: ActionType.INIT, seed: seed };
}

export function moveDown() {
  return { type: ActionType.MOVE_DOWN };
}

export function moveLeft() {
  return { type: ActionType.MOVE_LEFT };
}

export function moveRight() {
  return { type: ActionType.MOVE_RIGHT };
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
  seed: -1,
  position: {row: 0, col: 5},
  shape: [[0]]
}

function reduceInit(state, seed) {
  const shape = SHAPE_ROTATIONS[seed % SHAPE_ROTATIONS.length][0];
  return {...state,
    board: makeBlankBoard(20, 10),
    seed: seed,
    position: { row: 0, col: 5},
    shape: shape
  };
}

function reduceMoveDown(state) {
  const prevRow = state.position.row;
  const row = prevRow === state.board.length - 1 ? prevRow : prevRow + 1;

  const col = state.position.col;

  return {...state,
    position: {row: row, col: col}
  }
}

function reduceMoveLeft(state) {
  const row = state.position.row;

  const prevCol = state.position.col;
  const col = prevCol === 0 ? prevCol : prevCol - 1;

  return {...state,
    position: {row: row, col: col}
  }
}

function reduceMoveRight(state) {
  const row = state.position.row;

  const prevCol = state.position.col;
  const col = prevCol === state.board[0].length - 1 ? prevCol : prevCol + 1;

  return {...state,
    position: {row: row, col: col}
  }
}

function game(state = initialState, action) {
  switch (action.type) {
    case ActionType.INIT:
      return reduceInit(state, action.seed);
    case ActionType.MOVE_DOWN:
      return reduceMoveDown(state);
    case ActionType.MOVE_LEFT:
      return reduceMoveLeft(state);
    case ActionType.MOVE_RIGHT:
      return reduceMoveRight(state);
    default:
      return state;
  }
}

export const store = createStore(game)
