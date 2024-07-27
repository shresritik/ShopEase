import { Reducer } from "redux";
import { cartStore, counterStore } from "../store";
import { removeToken } from "../utils/auth";

export const cartReducer: Reducer<any, any> = (state = [], action) => {
  switch (action.type) {
    case "INCREMENT": {
      const { id, stock, qty, pic, product_name, selling_price } =
        action.payload;
      const newState = [
        ...state,
        { id, stock, qty, pic, product_name, selling_price },
      ];
      if (!!cartStore.getState()) {
        newState.push(...cartStore.getState());
      }
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
    case "RESET": {
      state = [];
      removeToken("cart");
      counterStore.dispatch({ type: "RESET" });
      return state;
    }
    default:
      return state;
  }
};
