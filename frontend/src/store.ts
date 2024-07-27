import { Action, Listener, Reducer } from "./interface/store";
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

export const cartStore = createStore<any, any>("cart", [], cartReducer);
export const counterStore = createStore<any, any>(
  "counter",
  {},
  counterReducer
);
export const updateStore = createStore<any, any>(
  "profile",
  {},
  updateProdReducer
);
export const userProfileStore = createStore<any, any>(
  "user-profile",
  {},
  userProfileReducer
);
