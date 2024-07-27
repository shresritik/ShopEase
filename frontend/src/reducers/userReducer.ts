import { Reducer } from "redux";
import { removeToken } from "../utils/auth";
import { CounterAction } from "../interface/store";

export const userProfileReducer: Reducer<any, CounterAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "STORE": {
      Object.assign(state, action.payload);
      return state;
    }
    case "RESET": {
      state = {};
      removeToken("accessToken");
      removeToken("user-profile");
      return state;
    }
    default:
      return state;
  }
};
export const updateProdReducer: Reducer<any, CounterAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "STORE": {
      Object.assign(state, action.payload);
      return state;
    }
    default:
      return state;
  }
};
