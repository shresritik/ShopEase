import { Reducer } from "redux";
import { cartStore, counterStore } from "../store";
import { removeToken } from "../utils/auth";
import { CartAction, CartState } from "../types/cartStore";
// cart reducer to increase, remove or reseet products on cart
export const cartReducer: Reducer<CartState, CartAction> = (
  state: CartState = [],
  action: CartAction
) => {
  switch (action.type) {
    case "INCREMENT": {
      const {
        id,
        stock,
        qty,
        pic,
        productName,
        sellingPrice,
        category,
        ...rest
      } = action.payload;
      const newState = [
        ...state,
        { id, stock, qty, pic, productName, sellingPrice, category, ...rest },
      ];
      if (!!cartStore.getState()) {
        newState.push(...cartStore.getState());
      }
      const combinedState = newState.reduce<CartState>((acc, product) => {
        const existingProduct = acc.find((p) => p.id == product.id);
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
        .map((product) => {
          if (product.id === id) {
            return { ...product, stock: product.stock - stock };
          }
          return product;
        })
        .filter((product) => product.stock > 0);
      return newState;
    }
    case "REMOVE": {
      const { id } = action.payload;
      const newState = [...state];
      const existingProduct = newState.findIndex((p) => p.id == id);
      if (existingProduct > -1) newState.splice(existingProduct, 1);
      return newState;
    }
    case "RESET": {
      state = [];
      removeToken("cart");
      counterStore.dispatch({ type: "RESET" });
      return state;
    }
    case "CHECKOUT": {
      state = [...action.payload];
      return state;
    }
    default:
      return state;
  }
};
