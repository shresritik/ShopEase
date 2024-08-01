import { CheckoutAmount } from "../components/checkout/CheckoutAmount";
import { CheckoutCardView } from "../components/checkout/CheckoutCardView";
import { CheckoutView } from "../components/checkout/CheckoutView";
import { CheckoutCard, ICheckoutProduct } from "../interface/checkout";
import { cartStore, locationStore, userProfileStore } from "../store";
import { roundOff } from "../utils";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { getCurrentLocation } from "../api/locationApi";
import { createOrders } from "../api/ordersApi";
import { esewaCall } from "../api/paymentApi";
import { toast } from "../utils/toast";
import { getADiscount } from "../api/discountApi";
import { IDiscount } from "../interface/discount";

export const render = () => {
  let coupon: string;
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
  checkoutAmount!.innerHTML = CheckoutAmount(totalAmount);
  const discountValue = checkoutAmount?.querySelector(
    "#discount"
  ) as HTMLInputElement;
  const address = container.querySelector(
    "#billing-address"
  ) as HTMLInputElement;
  locationStore.subscribe(
    (state) => (address.value = state.location ? state.location : "")
  );
  checkoutAmount
    ?.querySelector("#discountBtn")
    ?.addEventListener("click", async (e) => {
      e.preventDefault();
      const res = (await getADiscount(discountValue.value)) as IDiscount;
      if (res) {
        coupon = res.code;
        totalAmount.subtotal = amount - res.percentage;
        totalAmount.total = roundOff(totalAmount.subtotal * 1.13);
        checkoutAmount!.innerHTML = CheckoutAmount(totalAmount);
        const showValue = checkoutAmount?.querySelector(
          "#discountValue"
        ) as HTMLParagraphElement;
        const discountValue = checkoutAmount?.querySelector(
          "#discount"
        ) as HTMLInputElement;
        showValue?.classList.remove("hidden");
        showValue.textContent = `${res.percentage * 100}%`;
        checkoutAmount?.querySelector("#discountBtn")?.classList.add("hidden");
        checkoutAmount?.querySelector("#discount")?.classList.add("hidden");
        discountValue.classList.add("hidden");
      }
    });
  const submitPayment = async () => {
    const user = userProfileStore.getState();
    const email = container.querySelector("#email") as HTMLInputElement;
    email.value = user.email;

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
      discount: coupon ? coupon : undefined,
    };
    if (user.role.role_rank == 1 || user.role.role_rank == 2) {
      toast("Admin or Super Admin cannot pay", "danger");
    } else {
      const formResult = await createOrders(form);
      if (formResult && formResult.status == 200) {
        toast("Order Placed Successfully", "");
        esewaCall(formResult.data.formData);
      } else {
        toast("Something went wrong", "danger");
      }
    }
  };

  const payBtn = container.querySelector("#payBtn");
  payBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    await submitPayment();
  });

  return container;
};
