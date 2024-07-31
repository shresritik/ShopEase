import { removeToken } from "../utils/auth";

export const counterReducer = (state: any, action: any) => {
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
      const id = action.payload;
      const newState = { ...state };
      delete newState[id];

      return newState;
    }
    default:
      return state;
  }
};
