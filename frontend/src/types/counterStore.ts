export type CounterState = {
  [id: number]: number;
};

export type CounterAction =
  | { type: "INCREMENT"; payload: { id: number; amount?: number; qty: number } }
  | { type: "DECREMENT"; payload: { id: number; amount?: number } }
  | { type: "RESET" }
  | { type: "REMOVE"; payload: { id: number } | number };
