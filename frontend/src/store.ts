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

  function dispatch(action: A): void {
    state = reducer(state, action);
    listeners.forEach((listener) => listener(state));
  }

  function subscribe(listener: Listener<S>): void {
    listeners.push(listener);
  }

  return { dispatch, subscribe };
}

// Example usage:

const counterReducer: Reducer<CounterState, CounterAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "INCREMENT":
      return state + (action.payload ?? 1);
    case "DECREMENT":
      return state - (action.payload ?? 1);
    default:
      return state;
  }
};

export const counterStore = createStore<CounterState, CounterAction>(
  0,
  counterReducer
);
