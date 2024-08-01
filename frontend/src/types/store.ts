export type Action<T = string, P = any> = {
  type: T;
  payload?: P;
};
export type Reducer<S, A extends Action> = (state: S, action: A) => S;

export type Listener<S> = (state: S) => void;
