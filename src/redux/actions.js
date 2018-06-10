import { createStore } from "redux"

const ActionType = {
  INIT: "INIT",
  MOVE_DOWN: "MOVE_DOWN",
  MOVE_LEFT: "MOVE_LEFT",
  MOVE_RIGHT: "MOVE_RIGHT"
}

export const SHAPE_ROTATIONS = [
  [
    {
      shape:
      [
        [1, 1],
        [1, 1]
      ],
      left: 0,
      right: 0
    }
  ],
  [
    {
      shape:
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
      left: 0,
      right: 0
    },
    {
      shape:
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
      ],
      left: 0,
      right: 1
    }
  ],
  [
    {
      shape:  [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ],
      left: 0,
      right: 0
    },
    {
      shape:
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
      ],
      left: 1,
      right: 0
    }
  ],
  [
    {
      shape:
      [
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
      ],
      left: 1,
      right: 0
    },
    {
      shape:
      [
        [0, 0, 0],
        [0, 0, 1],
        [1, 1, 1]
      ],
      left: 0,
      right: 0
    },
    {
      shape:
      [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0]
      ],
      left: 0,
      right: 1
    },
    {
      shape:
      [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0]
      ],
      left: 0,
      right: 0
    }
  ],
  [
    {
      shape:
      [
        [1, 1, 0],
        [1, 0, 0],
        [1, 0, 0]
      ],
      left: 0,
      right: 1
    },
    {
      shape:
      [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]
      ],
      left: 0,
      right: 0
    },
    {
      shape:
      [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1]
      ],
      left: 1,
      right: 0
    },
    {
      shape:
      [
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
      ],
      left: 0,
      right: 0
    }
  ],
  [
    {
      shape:
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
      ],
      left: 0,
      right: 0
    },
    {
      shape:
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
      ],
      left: 0,
      right: 1
    },
    {
      shape:
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ],
      left: 0,
      right: 0
    },
    {
      shape:
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
      ],
      left: 1,
      right: 0
    }
  ],
  [
    {
      shape:
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
      ],
      left: 2,
      right: 1
    },
    {
      shape:
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      left: 0,
      right: 0
    }
  ]
];

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
  shape: {
    shape: [[0]],
    left: 0,
    right: 0
  }
}

function reduceInit(state, seed) {
  console.log(SHAPE_ROTATIONS.length, seed % SHAPE_ROTATIONS.length);
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

  const left = state.shape.left;
  const prevCol = state.position.col;
  const col = prevCol + left === 0 ? prevCol : prevCol - 1;

  return {...state,
    position: {row: row, col: col}
  }
}

function reduceMoveRight(state) {
  const row = state.position.row;

  const right = state.shape.right;
  const width = state.shape.shape[0].length;
  const prevCol = state.position.col;

  const col = prevCol + width - right < state.board[0].length ?
    prevCol + 1 : prevCol;

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
