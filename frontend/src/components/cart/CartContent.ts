import { IProduct } from "../../interface/product";
import { cartStore, counterStore } from "../../store";
import { BaseCart } from "./BaseCart";
export function updateSidebarContent(sidebarContent: HTMLElement) {
  const cartState = cartStore.getState();
  const counterState = counterStore.getState();
  sidebarContent!.innerHTML = "";
  let totalAmount = 0;
  if (cartState.length > 0) {
    cartState.forEach((prod: IProduct) => {
      const quantity = counterState[prod.id!] || 0;
      const prodTotal = quantity * prod.selling_price;
      totalAmount += prodTotal;
      sidebarContent!.innerHTML += BaseCart(prod, quantity, prodTotal);
    });

    sidebarContent!.innerHTML += `
      <div class="flex flex-col justify-end items-center mt-4 gap-2">
        <h1 class="text-lg font-bold">Subtotal: Rs.${totalAmount}</h1>
      <button id="order" class=" block w-full select-none rounded-lg bg-orange-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-orange-900/10 transition-all hover:shadow-lg hover:shadow-orange-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Order</button>
      <button id="reset" class="  block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  >Reset</button>
        '
      </div>`;
    sidebarContent!.querySelector("#reset")!.addEventListener("click", (e) => {
      e.preventDefault();
      cartStore.dispatch({ type: "RESET" });
    });
    sidebarContent!.querySelectorAll(".plus").forEach((plus) => {
      plus.addEventListener("click", function (e) {
        e.preventDefault();
        counterStore.dispatch({
          type: "INCREMENT",
          payload: { id: this.dataset.prod, qty: this.dataset.qty },
        });
      });
    });

    sidebarContent!.querySelectorAll(".minus").forEach((minus) => {
      minus.addEventListener("click", function (e) {
        e.preventDefault();
        counterStore.dispatch({
          type: "DECREMENT",
          payload: { id: this.dataset.prod },
        });
      });
    });

    sidebarContent!.querySelectorAll(".remove").forEach((remove) => {
      remove.addEventListener("click", function (e) {
        e.preventDefault();
        cartStore.dispatch({
          type: "REMOVE",
          payload: { id: this.dataset.prod },
        });
        counterStore.dispatch({
          type: "DECREMENT",
          payload: {
            id: this.dataset.prod,
            amount: counterStore.getState()[this.dataset.prod],
          },
        });
      });
    });
  } else {
    sidebarContent!.innerHTML = "<h1>Cart is empty</h1>";
  }
}
