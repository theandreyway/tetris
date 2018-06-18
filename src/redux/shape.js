import { SHAPE_ROTATIONS } from "./shapes.js"

export const INITIAL_SHAPE_STATE = {
  shapeIndex: 0,
  rotationIndex: 0,
  seed: -1
}

export function reduceInitShape(state, seed) {
  return {...state, seed: seed};
}

export function getShape(state) {
  return SHAPE_ROTATIONS[state.shapeIndex][state.rotationIndex];
}

// Using the first set of numbers from the table in
// https://en.wikipedia.org/wiki/Linear_congruential_generator
function nextSeed(seed) {
  const a = 1664525;
  const c = 1013904223;
  const m = 2 ** 32;

  return (a * seed + c) % m;
}

export function reduceNextShape(state) {
  const shapeIndex = state.seed % SHAPE_ROTATIONS.length;
  const rotationIndex = (state.seed % 13) % SHAPE_ROTATIONS[shapeIndex].length;

  return {
    ...state,
    shapeIndex: shapeIndex,
    rotationIndex: rotationIndex,
    seed: nextSeed(state.seed)
  }
}

function nextRotationIndex(shapeIndex, rotationIndex) {
  const numRotations = SHAPE_ROTATIONS[shapeIndex].length;
  return (rotationIndex + 1) % numRotations;
}

export function reduceRotateShapeRight(state) {
  const rotationIndex = nextRotationIndex(state.shapeIndex, state.rotationIndex);
  return { ...state, rotationIndex: rotationIndex }
}
