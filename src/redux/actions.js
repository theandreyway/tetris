import { createStore } from "redux"

export const SHAPE_ROTATIONS = [
  [
    {
      shape:
      [
        [1, 1],
        [1, 1]
      ],
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
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
      top: 0,
      left: 0,
      right: 0,
      bottom: 1
    },
    {
      shape:
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
      ],
      top: 0,
      left: 0,
      right: 1,
      bottom: 0
    }
  ],
  [
    {
      shape:  [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ],
      top: 0,
      left: 0,
      right: 0,
      bottom: 1
    },
    {
      shape:
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
      ],
      top: 0,
      left: 1,
      right: 0,
      bottom: 0
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
      top: 0,
      left: 1,
      right: 0,
      bottom: 0
    },
    {
      shape:
      [
        [0, 0, 0],
        [0, 0, 1],
        [1, 1, 1]
      ],
      top: 1,
      left: 0,
      right: 0,
      bottom: 0
    },
    {
      shape:
      [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0]
      ],
      top: 0,
      left: 0,
      right: 1,
      bottom: 0
    },
    {
      shape:
      [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0]
      ],
      top: 0,
      left: 0,
      right: 0,
      bottom: 1
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
      top: 0,
      left: 0,
      right: 1,
      bottom: 0
    },
    {
      shape:
      [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]
      ],
      top: 0,
      left: 0,
      right: 0,
      bottom: 1
    },
    {
      shape:
      [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1]
      ],
      top: 0,
      left: 1,
      right: 0,
      bottom: 0
    },
    {
      shape:
      [
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
      ],
      top: 1,
      left: 0,
      right: 0,
      bottom: 0
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
      top: 1,
      left: 0,
      right: 0,
      bottom: 0
    },
    {
      shape:
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
      ],
      top: 0,
      left: 0,
      right: 1,
      bottom: 0
    },
    {
      shape:
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ],
      top: 0,
      left: 0,
      right: 0,
      bottom: 1
    },
    {
      shape:
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
      ],
      top: 0,
      left: 1,
      right: 0,
      bottom: 0
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
      top: 0,
      left: 2,
      right: 1,
      bottom: 0
    },
    {
      shape:
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      top: 1,
      left: 0,
      right: 0,
      bottom: 2
    }
  ]
];

const ActionType = {
  INIT: "INIT",
  MOVE_DOWN: "MOVE_DOWN",
  MOVE_LEFT: "MOVE_LEFT",
  MOVE_RIGHT: "MOVE_RIGHT",
  ROTATE_RIGHT: "ROTATE_RIGHT"
}

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

export function rotateRight() {
  return { type: ActionType.ROTATE_RIGHT };
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  shapeIndex: -1,
  rotationIndex: 0
}

// Using the first set of numbers from the table in
// https://en.wikipedia.org/wiki/Linear_congruential_generator
function nextSeed(seed) {
  const a = 1664525;
  const c = 1013904223;
  const m = 2 ** 32;

  return (a * seed + c) % m;
}

function reduceInit(state, seed) {
  const board = makeBlankBoard(20, 10);

  const shapeIndex = seed % SHAPE_ROTATIONS.length;
  const rotations = SHAPE_ROTATIONS[shapeIndex];
  const rotationIndex = (seed % 13) % rotations.length;
  const shape = rotations[rotationIndex];

  const row = 0 - shape.top;
  const col = Math.trunc(
    (board[0].length - shape.shape[0].length - shape.left + shape.right + 1) / 2);
  console.log(col);

  return {...state,
    board: board,
    seed: nextSeed(seed),
    position: { row: row, col: col },
    shape: shape,
    shapeIndex: shapeIndex,
    rotationIndex: rotationIndex
  };
}

function reduceMoveDown(state) {
  const prevRow = state.position.row;
  const boardLength = state.board.length;
  const shapeLength = state.shape.shape.length;
  const bottom = state.shape.bottom;
  const maxRow = boardLength - shapeLength + bottom;
  const row = prevRow < maxRow ? prevRow + 1 : prevRow;

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

function reduceRotateRight(state) {
  const shapeIndex = state.shapeIndex;
  const numRotations = SHAPE_ROTATIONS[shapeIndex].length;
  const rotationIndex = (state.rotationIndex + 1) % numRotations;
  const shape = SHAPE_ROTATIONS[shapeIndex][rotationIndex];

  // ignore rotation if it would make the shape go below the board
  if (state.position.row + shape.shape.length - shape.bottom > state.board.length) {
    return state;
  }

  const boardWidth = state.board[0].length;
  const shapeWidth = shape.shape[0].length;

  // kick back on left
  let col = state.position.col;

  // this only works because all of the kick back shapes are fully
  // wide on the next rotation.  The logic would have to be updated
  // if shapes weren't this special.
  if (col < 0) {
    col = 0;
  }
  // kick back on right
  else if (col > boardWidth - shapeWidth) {
    col = boardWidth - shapeWidth;
  }

  // TODO: check for collision and don't rotate the shape if there is one.
  return {
    ...state,
    shape: shape,
    rotationIndex: rotationIndex,
    position: {row: state.position.row, col: col}
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
    case ActionType.ROTATE_RIGHT:
      return reduceRotateRight(state);
    default:
      return state;
  }
}

export const store = createStore(game)
