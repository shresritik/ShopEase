import { Reducer } from "redux";
import { UserProfileAction, UserProfileState } from "../types/userStore";
//location reduver to store location
export const locationReducer: Reducer<UserProfileState, UserProfileAction> = (
  state: UserProfileState = {},
  action: UserProfileAction
) => {
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
