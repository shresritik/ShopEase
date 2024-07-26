export const counterReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INCREMENT": {
      const { id, quantity = 1, qty } = action.payload;
      return {
        ...state,
        [id]:
          qty > (state[id] || 0) ? (state[id] || 0) + quantity : state[id] || 0,
      };
    }
    case "DECREMENT": {
      const { id, quantity = 1 } = action.payload;
      return {
        ...state,
        [id]: Math.max(0, (state[id] || 0) - quantity),
      };
    }
    case "RESET": {
      state = [];
      localStorage.removeItem("counter");
      return state;
    }
    default:
      return state;
  }
};
