import {
  Action,
  CounterAction,
  CounterState,
  Listener,
  Reducer,
} from "./interface/store";

function createStore<S, A extends Action>(
  initialState: S,
  reducer: Reducer<S, A>
) {
  let state = initialState;
  const listeners: Listener<S>[] = [];
  function getState() {
    return state;
  }
  function dispatch(action: A): void {
    state = reducer(state, action);
    listeners.forEach((listener) => listener(state));
  }

  function subscribe(listener: Listener<S>): void {
    listeners.push(listener);
  }

  return { getState, dispatch, subscribe };
}

// Example usage:

const counterReducer: Reducer<any, any> = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + (action.payload ?? 1);
    case "DECREMENT":
      return state - (action.payload ?? 1);
    default:
      return state;
  }
};
const updateProdReducer: Reducer<any, CounterAction> = (state, action) => {
  switch (action.type) {
    case "STORE": {
      Object.assign(state, action.payload);
      return state;
    }
    default:
      return state;
  }
};

export const counterStore = createStore<CounterState, CounterAction>(
  0,
  counterReducer
);
export const updateStore = createStore<any, CounterAction>(
  {},
  updateProdReducer
);
