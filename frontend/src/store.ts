import {
  Action,
  CounterAction,
  CounterState,
  Listener,
  Reducer,
} from "./interface/store";
import { userProfileReducer } from "./reducers/userReducer";

function createStore<S, A extends Action>(
  stateName: string,
  initialState: S,
  reducer: Reducer<S, A>
) {
  let state = initialState;
  const listeners: Listener<S>[] = [];
  function getState() {
    if (!state || state.length) return (state = initialState);
    return state;
  }

  function dispatch(action: A): void {
    state = reducer(state, action);
    localStorage.setItem(stateName, JSON.stringify(state));
    listeners.forEach((listener) => listener(state));
  }

  function subscribe(listener: Listener<S>): void {
    state = getState();
    listeners.push(listener);
  }

  return { getState, dispatch, subscribe };
}

const counterReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INCREMENT": {
      const { id, amount = 1, qty } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        [id]:
          qty > (state[id] || 0) ? (state[id] || 0) + amount : state[id] || 0,
      };
    }
    case "DECREMENT": {
      const { id, amount = 1 } = action.payload;
      return {
        ...state,
        [id]: Math.max(0, (state[id] || 0) - amount),
      };
    }

    default:
      return state;
  }
};

const cartReducer: Reducer<any, any> = (state = [], action) => {
  switch (action.type) {
    case "INCREMENT": {
      const { id, stock, qty, pic, product_name, selling_price } =
        action.payload;
      // Add the new product to the state

      const newState = [
        ...state,
        { id, stock, qty, pic, product_name, selling_price },
      ];
      if (!!cartStore.getState()) {
        newState.push(...cartStore.getState());
      }
      // Combine products with the same id
      const combinedState = newState.reduce((acc, product) => {
        const existingProduct = acc.find((p: any) => p.id == product.id);
        if (existingProduct) {
          existingProduct.qty = product.qty;
        } else {
          acc.push(product);
        }
        return acc;
      }, []);

      return combinedState;
    }
    case "DECREMENT": {
      const { id, stock } = action.payload;
      const newState = state
        .map((product: any) => {
          if (product.id === id) {
            return { ...product, stock: product.stock - stock };
          }
          return product;
        })
        .filter((product: any) => product.stock > 0);

      return newState;
    }
    case "REMOVE": {
      const { id } = action.payload;
      const newState = [...state];
      const existingProduct = newState.findIndex((p: any) => p.id == id);
      newState.splice(existingProduct, 1);
      return newState;
    }
    // case "RESET": {
    //   state = [];
    //   localStorage.removeItem("cart");
    //   return state;
    // }
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
