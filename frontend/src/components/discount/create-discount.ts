import { AxiosError } from "axios";
import { createElement } from "../../utils/createElement.ts";
import { toast } from "../../utils/toast.ts";
import { CreateCouponView } from "./CreateDiscountView.ts";
import { IDiscount } from "../../interface/discount.ts";
import { createDiscount } from "../../api/discountApi.ts";
// create discount page
export const render = async () => {
  const container = createElement("div", {
    className: "flex flex-col justify-center items-center w-full",
  });
  container.innerHTML += CreateCouponView();
  const couponName = container.querySelector(
    "#coupon-name"
  ) as HTMLInputElement;
  const worth = container.querySelector("#coupon-worth") as HTMLInputElement;
  const fromDate = container.querySelector("#from-date") as HTMLDataElement;
  const toDate = container.querySelector("#to-date") as HTMLDataElement;
  const inputs = [couponName, worth, fromDate, toDate];
  container.querySelector("#submit")?.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const couponData: IDiscount = {
        code: couponName.value,
        percentage: +worth.value,
        validFrom: new Date(fromDate.value).toISOString(),
        validUntil: new Date(toDate.value).toISOString(),
      };
      const res = await createDiscount(couponData);
      if (res && res.status == 201) {
        toast("Coupon created Successfully", "");
      } else {
        toast("Something went wrong", "danger");
      }
    } catch (error) {
      const errorElement = container.querySelector(".error") as HTMLElement;
      console.log(errorElement);
      if (error instanceof AxiosError) {
        errorElement.textContent = `${error.response?.data.error}`;
        errorElement.classList.remove("hidden");
        toast(error.response?.data.error, "danger");
      } else if (error instanceof Error) {
        errorElement.textContent = `${error}`;
        errorElement.classList.remove("hidden");
        toast(error.message, "danger");
      }
    }
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const errorElement = container.querySelector(".error") as HTMLElement;
        errorElement.classList.add("hidden");
        const successElement = container.querySelector(
          ".success"
        ) as HTMLElement;
        successElement.classList.add("hidden");
      });
    });
  });
  return container;
};
