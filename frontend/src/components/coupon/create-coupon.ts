import { AxiosError } from "axios";
import { createElement } from "../../utils/createElement";
import { toast } from "../../utils/toast";
import { CreateCouponView } from "./CreateCouponView.ts";
import { IDiscount } from "../../interface/discount.ts";
import { createDiscount } from "../../api/discountApi.ts";

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
  container.querySelector("#submit")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const couponData: IDiscount = {
      code: couponName.value,
      percentage: +worth.value,
      validFrom: new Date(fromDate.value).toISOString(),
      validUntil: new Date(toDate.value).toISOString(),
    };
    try {
      const res = await createDiscount(couponData);
      if (res && res.status == 201) {
        toast("Coupon created Successfully", "");
      } else {
        toast("Something went wrong", "danger");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.error, "danger");
      }
    }
  });
  return container;
};
