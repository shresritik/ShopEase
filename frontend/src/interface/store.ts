export type Action<T = string> = {
  type: T;
  payload?: unknown;
};

export type Reducer<S, A extends Action> = (state: S, action: A) => S;

export type Listener<S> = (state: S) => void;
export type CounterState = number | [] | {};
export type CounterAction = { type: string; payload?: number | [] | {} };
