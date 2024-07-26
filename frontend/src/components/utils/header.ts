import { cartStore, counterStore } from "../../store";
import { Cart } from "../cart/Cart";
import { Navbar } from "./Navbar";
import { updateSidebarContent } from "../cart/CartContent";
export const navbarRender = async () => {
  document.getElementById("navbar")!.innerHTML = Navbar();
  document.getElementById("navbar")!.innerHTML += Cart();
  const text = document.getElementById("cartList");
  const cartIcon = document.querySelector("#cartIcon");
  const sidebar = document.querySelector("#sidebar-cart");
  const sidebarContent = document.querySelector(
    "#sidebar-content"
  ) as HTMLElement;
  // Updating quantities and total amount when counterStore changes
  counterStore.subscribe(() => {
    updateSidebarContent(sidebarContent);
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
