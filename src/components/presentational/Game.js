import React from 'react';
import { Board } from "./Board.js"

export function Game(props) {
  return (
    <div tabIndex={0}
          onKeyDown={props.onKeyDown}
          onKeyUp={props.onKeyUp}>
      <div className="game">
        <Board rows={props.board} />
      </div><div className="game">
        <Board rows={props.nextShape} />
        <p> Score: {props.score} </p>
        <p> Speed: {props.speed} </p>
      </div>
    </div>
  )
}
