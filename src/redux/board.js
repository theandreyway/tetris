
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

export function addShapeToBoard(originalBoard, shape, position) {
  return addShapeToBoardAndCheckForCollision(originalBoard, shape, position)[0];
}

export function checkForCollision(originalBoard, shape, position) {
  return addShapeToBoardAndCheckForCollision(originalBoard, shape, position)[1];
}

export function clearCompleteRows(board) {
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

export const INITIAL_BOARD_STATE = makeBlankBoard(20, 10);
