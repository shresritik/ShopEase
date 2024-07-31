export const locationReducer = (state: any, action: any) => {
  switch (action.type) {
    case "STORE": {
      const location = action.payload;
      return {
        ...state,
        location,
      };
    }

    default:
      return state;
  }
};
