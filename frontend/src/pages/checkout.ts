import { CheckoutAmount } from "../components/checkout/CheckoutAmount";
import { CheckoutCardView } from "../components/checkout/CheckoutCardView";
import { CheckoutView } from "../components/checkout/CheckoutView";
import { CheckoutCard } from "../interface/checkout";
import { cartStore } from "../store";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { toast } from "../utils/toast";

export const render = () => {
  const container = createElement("div", { className: "p-6" });
  const checkoutState = cartStore.getState();
  if (checkoutState.length == 0) {
    toast("No items in cart to checkout", "danger");
    dispatch("/");
  }
  container.innerHTML = CheckoutView();
  const checkoutWrapper = container.querySelector(".checkout-wrapper");
  const checkoutAmount = container.querySelector(".checkout-amount");
  let amount = 0;
  checkoutState.forEach((prod: CheckoutCard) => {
    amount += prod.qty * prod.selling_price;
    prod = { ...prod, subtotal: prod.qty * prod.selling_price };
    checkoutWrapper!.innerHTML += CheckoutCardView(prod);
  });
  let totalAmount = {
    subtotal: amount,
    delivery: 40,
    total: amount + 40,
  };
  checkoutAmount!.innerHTML += CheckoutAmount(totalAmount);
  const email = container.querySelector("#email") as HTMLInputElement;
  const address = container.querySelector(
    "#billing-address"
  ) as HTMLInputElement;
  const payBtn = container.querySelector("#payBtn");
  payBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(email.value);
    console.log(address.value);
  });

  return container;
};
