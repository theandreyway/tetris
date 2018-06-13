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
      rows[r][c] = 0;
    }
  }

  return rows;
}

const initialState = {
  board: makeBlankBoard(20, 10),
  seed: -1,
  position: {row: 0, col: 5},
  shapeIndex: 0,
  rotationIndex: 0,
  isColision: false,
  score: 0
}

// Using the first set of numbers from the table in
// https://en.wikipedia.org/wiki/Linear_congruential_generator
function nextSeed(seed) {
  const a = 1664525;
  const c = 1013904223;
  const m = 2 ** 32;

  return (a * seed + c) % m;
}

function getShape(state) {
  return SHAPE_ROTATIONS[state.shapeIndex][state.rotationIndex];
}

function reduceNextShape(state) {
  const shapeIndex = state.seed % SHAPE_ROTATIONS.length;
  const rotationIndex = (state.seed % 13) % SHAPE_ROTATIONS[shapeIndex].length;
  const shape = SHAPE_ROTATIONS[shapeIndex][rotationIndex];

  const row = 0 - shape.top;
  const col = Math.trunc(
    (state.board[0].length - shape.shape[0].length
      - shape.left + shape.right + 1) / 2);

  return {
    ...state,
    shapeIndex: shapeIndex,
    rotationIndex: rotationIndex,
    seed: nextSeed(state.seed),
    position: { row: row, col: col },
  }
}

function reduceInit(state, seed) {
  return reduceNextShape({...state,
    board: makeBlankBoard(20, 10),
    seed: seed
  });
}

function reduceMoveDown(state) {
  const prevRow = state.position.row;
  const boardLength = state.board.length;

  const shape = getShape(state);
  const shapeLength = shape.shape.length;
  const bottom = shape.bottom;

  const maxRow = boardLength - shapeLength + bottom;
  const row = prevRow < maxRow ? prevRow + 1 : prevRow;

  const col = state.position.col;
  const position = {row: row, col: col};
  const isCollision = checkForCollision(state.board, shape, position);

  return {...state,
    position: isCollision ? state.position : position,
    // it's a colision if the block didn't move down.
    isColision: isCollision || state.position.row === row
  }
}

function reduceMoveLeft(state) {
  const row = state.position.row;

  const shape = getShape(state);
  const left = shape.left;
  const prevCol = state.position.col;
  const col = prevCol + left === 0 ? prevCol : prevCol - 1;

  const position = {row: row, col: col};
  const isCollision = checkForCollision(state.board, shape, position);

  return isCollision ? state : { ...state, position: position };
}

function reduceMoveRight(state) {
  const row = state.position.row;

  const shape = getShape(state);
  const right = shape.right;
  const width = shape.shape[0].length;
  const prevCol = state.position.col;

  const col = prevCol + width - right < state.board[0].length ?
    prevCol + 1 : prevCol;

  const position = {row: row, col: col};
  const isCollision = checkForCollision(state.board, shape, position);

  return isCollision ? state : { ...state, position: position };
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

  // left/right kick backs
  let col = state.position.col;

  // kick back on left
  if (col + shape.left < 0) {
    col = 0;
  }
  // kick back on right
  else if (col + shapeWidth - shape.right > boardWidth - 1) {
    col = boardWidth - shapeWidth;
  }

  // kick down at the top
  let row = state.position.row;

  if (row + shape.top < 0) {
    row = -1 * shape.top;
  }

  // TODO: check for collision and don't rotate the shape if there is one.
  return {
    ...state,
    rotationIndex: rotationIndex,
    position: {row: row, col: col}
  }
}

function addShapeToBoardAndCheckForCollision(originalBoard, shape, position) {
  let board = originalBoard.map(a => a.map(b => b))
  let isCollision = false;

  for (let r = shape.top; r < shape.shape.length - shape.bottom; r++) {
    for (let c = shape.left; c < shape.shape[0].length - shape.right; c++) {
      if (shape.shape[r][c]) {
        if(board[position.row + r][position.col + c]) {
          isCollision = true;
        } else {
          board[position.row + r][position.col + c] = 1;
        }
      }
    }
  }

  return [board, isCollision];
}

function addShapeToBoard(originalBoard, shape, position) {
  return addShapeToBoardAndCheckForCollision(originalBoard, shape, position)[0];
}

function checkForCollision(originalBoard, shape, position) {
  return addShapeToBoardAndCheckForCollision(originalBoard, shape, position)[1];
}

function clearCompleteRows(board) {
  const cleared = board.filter(row => !row.reduce(
    (acc, val) => {return acc && val === 1}, true));
  const rowsCleared = board.length - cleared.length;

  if (rowsCleared === 0) {
    return [board, 0];
  } else {
    const newRows = makeBlankBoard(rowsCleared, board[0].length);
    return [[...newRows, ...cleared], rowsCleared];
  }
}

function game(state = initialState, action) {
  if (state.isColision) {
    const colided = addShapeToBoard(state.board, getShape(state), state.position);
    const [cleared, rowsCleared] = clearCompleteRows(colided);
    return reduceNextShape({
      ...state,
      board: cleared,
      score: state.score + rowsCleared,
      isColision: false
    });
  }

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

export const store = createStore(game);

export const mapStateProps = state => {
  return {
    board: addShapeToBoard(state.board, getShape(state), state.position),
    seed: state.seed
  }
}
