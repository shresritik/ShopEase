import { CounterAction, CounterState } from "../types/counterStore";
import { removeToken } from "../utils/auth";
//counter reducer to increase, decrease and reset the quantity where min is 0
export const counterReducer = (
  state: CounterState = {},
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case "INCREMENT": {
      const { id, amount = 1, qty } = action.payload;
      return {
        ...state,
        [id]:
          qty > (state[id] || 0) ? (state[id] || 0) + amount : state[id] || 0,
      };
    }
    case "DECREMENT": {
      const { id, amount = 1 } = action.payload;
      return {
        ...state,
        [id]: Math.max(0, (state[id] || 0) - amount),
      };
    }
    case "RESET": {
      state = [];
      removeToken("counter");
      return state;
    }
    case "REMOVE": {
      const id = action.payload as number;
      const newState = { ...state };
      delete newState[id];

      return newState;
    }
    default:
      return state;
  }
};
