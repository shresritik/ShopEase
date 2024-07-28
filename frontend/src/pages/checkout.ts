import { CheckoutAmount } from "../components/checkout/CheckoutAmount";
import { CheckoutCardView } from "../components/checkout/CheckoutCardView";
import { CheckoutView } from "../components/checkout/CheckoutView";
import { CheckoutCard, ICheckoutProduct } from "../interface/checkout";
import { IProduct } from "../interface/product";
import { cartStore, userProfileStore } from "../store";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { createOrders } from "../utils/ordersApi";
import { esewaCall } from "../utils/paymentApi";
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
  const user = userProfileStore.getState();

  const email = container.querySelector("#email") as HTMLInputElement;
  email.value = user.email;
  const address = container.querySelector(
    "#billing-address"
  ) as HTMLInputElement;
  let checkProducts: ICheckoutProduct[] = [];
  checkoutState.map((el: ICheckoutProduct) => {
    checkProducts.push({
      id: el.id,
      quantity: el.qty,
      selling_price: el.selling_price,
      category_id: el.category!.id,
    });
  });
  const form = {
    userId: user.id,
    totalAmount: totalAmount.total,
    products: checkProducts,
    location: address.value,
  };

  const payBtn = container.querySelector("#payBtn");
  payBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formResult = await createOrders(form);
    if (formResult.status == 200) {
      toast("Order Placed Successfully", "");
      console.log(formResult.data.formData);
      esewaCall(formResult.data.formData);
    }
  });

  return container;
};
