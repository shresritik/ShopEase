import { cartStore, counterStore } from "../../store";
import { Cart } from "../cart/Cart";
import { IProduct } from "../../interface/product";
import { BaseCart } from "../cart/BaseCart";
import { Navbar } from "./Navbar";
import { TotalAmountView } from "../utils/subview";
export const navbarRender = async () => {
  document.getElementById("navbar")!.innerHTML = Navbar();
  document.getElementById("navbar")!.innerHTML += Cart();
  const text = document.getElementById("cartList");
  const cartIcon = document.querySelector("#cartIcon");
  const sidebar = document.querySelector("#sidebar-cart");
  const sidebarContent = document.querySelector(
    "#sidebar-content"
  ) as HTMLElement;
  function updateSidebarContent() {
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

      sidebarContent!.innerHTML += TotalAmountView(totalAmount);
      sidebarContent!
        .querySelector("#reset")!
        .addEventListener("click", (e) => {
          e.preventDefault();
          cartStore.dispatch({ type: "RESET" });
        });
      sidebarContent!.querySelectorAll<HTMLElement>(".plus").forEach((plus) => {
        plus.addEventListener("click", function (e) {
          e.preventDefault();
          counterStore.dispatch({
            type: "INCREMENT",
            payload: { id: this.dataset.prod, qty: this.dataset.qty },
          });
        });
      });

      sidebarContent!
        .querySelectorAll<HTMLElement>(".minus")
        .forEach((minus) => {
          minus.addEventListener("click", function (e) {
            e.preventDefault();
            counterStore.dispatch({
              type: "DECREMENT",
              payload: { id: this.dataset.prod },
            });
          });
        });

      sidebarContent!
        .querySelectorAll<HTMLElement>(".remove")
        .forEach((remove) => {
          remove.addEventListener("click", function (e) {
            e.preventDefault();
            const prodId = this.dataset.prod;
            if (prodId) {
              cartStore.dispatch({
                type: "REMOVE",
                payload: { id: this.dataset.prod },
              });
              counterStore.dispatch({
                type: "DECREMENT",
                payload: {
                  id: this.dataset.prod,
                  amount: counterStore.getState()[prodId],
                },
              });
            }
          });
        });
    } else {
      sidebarContent!.innerHTML = "<h1>Cart is empty</h1>";
    }
  }
  // Updating quantities and total amount when counterStore changes
  counterStore.subscribe(() => {
    updateSidebarContent();
  });
  // Toggle sidebar visibility on cart icon click
  cartIcon?.addEventListener("click", (e) => {
    e.preventDefault();
    sidebar?.classList.toggle("translate-x-0");
    sidebar?.classList.toggle("translate-x-full");
  });
  // Subscribe to cartStore to update sidebar content
  cartStore.subscribe(updateSidebarContent);
  cartStore.subscribe((state) => (text!.innerText = "" + state.length));
};
