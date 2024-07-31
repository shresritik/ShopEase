export type Action<T = string> = {
  type: T;
  payload?: any;
};

export type Reducer<S, A extends Action> = (state: S, action: A) => S;

export type Listener<S> = (state: S) => void;
export type CounterAction = { type: string; payload?: number | [] | {} };
export type CartState = any;
export type CounterState = any;
export type UserProfileState = any;
export type LocationStore = any;
