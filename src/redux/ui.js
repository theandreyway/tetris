
const START_MOVE = "MOVE";
const STOP_MOVE = "STOP_MOVE";
const TICK = "TICK";


export function startMove(direction) {
  return { type: START_MOVE, direction: direction };
}

export function tick() {
  return { type: TICK };
}

export function stopMove() {
  return { type: STOP_MOVE };
}

function reduceStopMove(state) {
  return {...state, direction:"", actionTick: 0 };
}

function reduceStartMove(state, direction) {
  if (state.direction == "") {
    return reduceMove({...state, direction:direction });
  } else {
    return state;
  }
}

function reduceActionTick(state) {
  if(state.actionTick > state.actionFrameRate) {
    return reduceMove({...state, actionTick: 0 });
  } else {
    return {...state, actionTick: state.actionTick + 1 };
  }
}

function reduceDownTick(state) {
  if (state.downTick > state.downFrameRate) {
    return reduceMoveDown({...state, downTick:0 });
  } else {
    return { ...state, downTick: state.downTick + 1 };
  }
}

function reduceTick(state) {
  console.log("tick");
  const actionState = reduceActionTick(state);
  if (actionState.direction !== "down") {
    return reduceDownTick(actionState);
  }
  return actionState;
}

function reduceAction(state, action) {
    case ActionType.TICK:
      return reduceTick(state);
    case ActionType.START_MOVE:
      return reduceStartMove(state, action.direction);
    case ActionType.STOP_MOVE:
      return reduceStopMove(state);
    default:
      return state;
  }
}
