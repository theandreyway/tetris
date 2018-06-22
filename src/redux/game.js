import { createStore } from "redux"

import { INITIAL_SHAPE_STATE,
  getShape, reduceInitShape, reduceNextShape, reduceRotateShapeRight
} from "./shape.js"

import { INITIAL_BOARD_STATE,
  addShapeToBoard, checkForCollision, clearCompleteRows
} from "./board.js"

const INIT_GAME = "INIT_GAME"
const MOVE_DOWN = "MOVE_DOWN";
const MOVE_LEFT = "MOVE_LEFT";
const MOVE_RIGHT = "MOVE_RIGHT";
const ROTATE_RIGHT = "ROTATE_RIGHT";
const DROP = "DROP";


export function initGame(seed) {
  return { type: INIT_GAME, seed: seed };
}


export function moveDown() {
  return { type: MOVE_DOWN };
}

export function moveLeft() {
  return { type: MOVE_LEFT };
}

export function moveRight() {
  return { type: MOVE_RIGHT };
}

export function rotateRight() {
  return { type: ROTATE_RIGHT };
}

export function drop() {
  return { type: DROP };
}


const INITIAL_GAME_STATE = {

  board: INITIAL_BOARD_STATE,
  shape: INITIAL_SHAPE_STATE,

  position: {row: 0, col: 5},

  isCollision: false,
  isGameOver: false,
  score: 0
}


function centerShape(board, shape) {
  const boardLength = board[0].length;
  const shapeLength = shape.shape[0].length;

  return Math.trunc(
    (boardLength - shapeLength - shape.left + shape.right + 1) / 2);
}

function reduceInitNextShape(state) {
  const shapeState = reduceNextShape(state.shape);
  const shape = getShape(shapeState);

  const col = centerShape(state.board, shape);
  const row = 0 - shape.top;

  const position = { row: row, col: col };

  return {
    ...state,
    shape: shapeState,
    position: position,
    isGameOver: checkForCollision(state.board, shape, position)
  }
}

function reduceInitGame(state, seed) {
  const shape = reduceInitShape(state.shape, seed);
  return reduceInitNextShape({...state, shape: shape });
}

function reduceMoveDown(state) {
  const prevRow = state.position.row;
  const boardLength = state.board.length;

  const shape = getShape(state.shape);
  const shapeLength = shape.shape.length;
  const bottom = shape.bottom;

  const maxRow = boardLength - shapeLength + bottom;
  const row = prevRow < maxRow ? prevRow + 1 : prevRow;

  const col = state.position.col;
  const position = {row: row, col: col};
  const isCollision = checkForCollision(state.board, shape, position);

  const newState = {...state,
    position: isCollision ? state.position : position,
    // it's a colision if the block didn't move down.
    isCollision: isCollision || state.position.row === row
  };

  return newState;
}

function reduceDrop(state) {
  let newState = state;
  while (!newState.isCollision) {
    newState = reduceMoveDown(newState);
  }
  return newState;
}

function reduceMoveLeft(state) {
  const row = state.position.row;

  const shape = getShape(state.shape);
  const left = shape.left;
  const prevCol = state.position.col;
  const col = prevCol + left === 0 ? prevCol : prevCol - 1;

  const position = {row: row, col: col};
  const isCollision = checkForCollision(state.board, shape, position);

  return isCollision ? state : { ...state, position: position };
}

function reduceMoveRight(state) {
  const row = state.position.row;

  const shape = getShape(state.shape);
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
  const shapeState = reduceRotateShapeRight(state.shape);
  const shape = getShape(shapeState);

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

  const position = {row: row, col: col};
  const isCollision = checkForCollision(state.board, shape, position);

  return isCollision ? state : {
    ...state,
    shape: shapeState,
    position: position
  }
}

function reduceAction(state, action) {
  switch (action.type) {
    case INIT_GAME:
      return reduceInitGame(state, action.seed);
    case MOVE_DOWN:
      return reduceMoveDown(state);
    case MOVE_LEFT:
      return reduceMoveLeft(state);
    case MOVE_RIGHT:
      return reduceMoveRight(state);
    case ROTATE_RIGHT:
      return reduceRotateRight(state);
    case DROP:
      return reduceDrop(state);
    default:
      return state;
  }
}

function reduceCollision(state) {
  const colided = addShapeToBoard(state.board, getShape(state.shape), state.position);
  const [cleared, rowsCleared] = clearCompleteRows(colided);
  return reduceInitNextShape({
    ...state,
    board: cleared,
    score: state.score + rowsCleared,
    isCollision: false
  });
}

function reduceGame(state = INITIAL_GAME_STATE, action) {
  if (state.isGameOver) {
    return state;
  }

  const newState = reduceAction(state, action);
  return newState.isCollision ? reduceCollision(newState) : newState;
}

export const store = createStore(reduceGame);

export const mapStateProps = state => {
  const shape = getShape(state.shape);
  return {
    board: addShapeToBoard(state.board, shape, state.position),
    seed: state.seed
  }
}
