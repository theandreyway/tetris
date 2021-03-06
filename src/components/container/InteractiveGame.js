import { connect } from 'react-redux';

import { Game } from "../presentational/Game.js"

import {
  SHAPE_PREVIEW_BACKGROUND, addShapeToBoard
} from "../../redux/board.js"

import {
  convertScoreToSpeed
} from "../../redux/speed.js"

import {
  getShape
} from "../../redux/shape.js"

import {
  drop, rotateRight
} from '../../redux/game.js';

import {
  timers,
  reduceStartLeft, reduceStopLeft,
  reduceStartRight, reduceStopRight,
  reduceStartDown, reduceStopDown
} from "../../redux/timers.js"

const mapStateProps = state => {
  const shape = getShape(state.shape.current);
  const nextShape = getShape(state.shape.next);
  const nextShapePosition = {row: 0, col: 0};
  return {
    board: addShapeToBoard(state.board, shape, state.position),
    score: state.score,
    nextShape: addShapeToBoard(
      SHAPE_PREVIEW_BACKGROUND, nextShape, nextShapePosition),
    speed: convertScoreToSpeed(state.score) + 1
  }
}

const mapDisptchToProps = dispatch => {
  return {
    onKeyDown: e => {
      switch (e.key) {
        case "ArrowDown":
          timers.apply(reduceStartDown);
          break;
        case "ArrowLeft":
          timers.apply(reduceStartLeft);
          break;
        case "ArrowRight":
          timers.apply(reduceStartRight);
          break;
        case "ArrowUp":
          dispatch(rotateRight());
          break;
        case " ":
          dispatch(drop());
          break;
        default:
          break;
      }
      e.stopPropagation();
      e.preventDefault();
    },
    onKeyUp: e => {
      switch (e.key) {
        case "ArrowDown":
          timers.apply(reduceStopDown);
          break;
        case "ArrowLeft":
          timers.apply(reduceStopLeft);
          break;
        case "ArrowRight":
          timers.apply(reduceStopRight);
          break;
        default:
          break;
      }
      e.stopPropagation();
      e.preventDefault();
    }
  }
}

export const InteractiveGame = connect(mapStateProps, mapDisptchToProps)(Game)
