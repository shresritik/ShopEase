import { CheckoutAmount } from "../components/checkout/CheckoutAmount";
import { CheckoutCardView } from "../components/checkout/CheckoutCardView";
import { CheckoutView } from "../components/checkout/CheckoutView";
import { CheckoutCard, ICheckoutProduct } from "../interface/checkout";
import { cartStore, locationStore, userProfileStore } from "../store";
import { roundOff } from "../utils";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { getCurrentLocation } from "../utils/locationApi";
import { createOrders } from "../utils/ordersApi";
import { esewaCall } from "../utils/paymentApi";
import { toast } from "../utils/toast";
export const render = () => {
  getCurrentLocation();
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
    total: roundOff(amount * 1.13),
  };
  checkoutAmount!.innerHTML += CheckoutAmount(totalAmount);
  const user = userProfileStore.getState();
  const email = container.querySelector("#email") as HTMLInputElement;
  email.value = user.email;
  const address = container.querySelector(
    "#billing-address"
  ) as HTMLInputElement;
  locationStore.subscribe((state) => (address.value = state.location));
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
    if (user.role.role_rank == 1 || user.role.role_rank == 2) {
      toast("Admin or Super Admin cannot pay", "danger");
    } else {
      const formResult = await createOrders(form);
      if (formResult && formResult.status == 200) {
        toast("Order Placed Successfully", "");
        esewaCall(formResult.data.formData);
      } else {
        console.log(formResult);
        toast("Something went wrong", "danger");
      }
    }
  });

  return container;
};
