import { Reducer } from "redux";
import { removeToken } from "../utils/auth";
import { UserProfileAction, UserProfileState } from "../types/userStore";
//user reducer to store and remove the profile information
export const userProfileReducer: Reducer<
  UserProfileState,
  UserProfileAction
> = (state: UserProfileState = {}, action: UserProfileAction) => {
  switch (action.type) {
    case "STORE": {
      return { ...state, ...action.payload };
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
//user reducer to store and remove the product information
export const updateProdReducer: Reducer<UserProfileState, UserProfileAction> = (
  state: UserProfileState = {},
  action: UserProfileAction
) => {
  switch (action.type) {
    case "STORE": {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
