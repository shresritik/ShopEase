import { Action, Listener, Reducer } from "./types/store";
import { cartReducer } from "./reducers/cartReducer";
import { counterReducer } from "./reducers/counterReducer";
import { updateProdReducer, userProfileReducer } from "./reducers/userReducer";
import { CartAction, CartState } from "./types/cartStore";
import { getToken, saveToken } from "./utils/auth";
import { CounterAction, CounterState } from "./types/counterStore";
import { UserProfileAction, UserProfileState } from "./types/userStore";
//store to get and set state in local storage
function createStore<S, A extends Action>(
  stateName: string,
  initialState: S,
  reducer: Reducer<S, A>
) {
  let state = initialState;
  const listeners: Listener<S>[] = [];
  //get current state
  function getState() {
    const storedState = getToken(stateName);
    if (storedState) {
      state = JSON.parse(storedState);
    } else {
      state = initialState;
    }
    return state;
  }
  // specify action for the state and add to the listeners array to listen to all the dispatch functions
  function dispatch(action: A): void {
    state = reducer(state, action);
    saveToken(stateName, JSON.stringify(state));
    listeners.forEach((listener) => listener(state));
  }
  // listen to all the subscribers of the state
  function subscribe(listener: Listener<S>): void {
    listeners.push(listener);
    listener(state);
  }

  return { getState, dispatch, subscribe };
}
//creating the stores
export const cartStore = createStore<CartState, CartAction>(
  "cart",
  [],
  cartReducer
);
export const counterStore = createStore<CounterState, CounterAction>(
  "counter",
  {},
  counterReducer
);
export const updateStore = createStore<UserProfileState, UserProfileAction>(
  "profile",
  {},
  updateProdReducer
);
export const userProfileStore = createStore<
  UserProfileState,
  UserProfileAction
>("user-profile", {}, userProfileReducer);
