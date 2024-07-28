import {
  Action,
  CartState,
  CounterState,
  Listener,
  Reducer,
  UserProfileState,
} from "./interface/store";
import { cartReducer } from "./reducers/cartReducer";
import { counterReducer } from "./reducers/counterReducer";
import { updateProdReducer, userProfileReducer } from "./reducers/userReducer";
import { getToken, saveToken } from "./utils/auth";

function createStore<S, A extends Action>(
  stateName: string,
  initialState: S,
  reducer: Reducer<S, A>
) {
  let state = initialState;
  const listeners: Listener<S>[] = [];

  function getState() {
    const storedState = getToken(stateName);
    if (storedState) {
      state = JSON.parse(storedState);
    } else {
      state = initialState;
    }
    return state;
  }

  function dispatch(action: A): void {
    state = reducer(state, action);
    saveToken(stateName, JSON.stringify(state));
    listeners.forEach((listener) => listener(state));
  }

  function subscribe(listener: Listener<S>): void {
    listeners.push(listener);
    listener(state);
  }

  return { getState, dispatch, subscribe };
}

export const cartStore = createStore<CartState, Action>(
  "cart",
  [],
  cartReducer
);
export const counterStore = createStore<CounterState, Action>(
  "counter",
  {},
  counterReducer
);
export const updateStore = createStore<UserProfileState, Action>(
  "profile",
  {},
  updateProdReducer
);
export const userProfileStore = createStore<UserProfileState, Action>(
  "user-profile",
  {},
  userProfileReducer
);
