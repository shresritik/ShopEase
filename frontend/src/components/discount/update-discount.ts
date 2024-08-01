import { AxiosError } from "axios";
import { createElement } from "../../utils/createElement";
import { toast } from "../../utils/toast";
import { CreateCouponView } from "./CreateDiscountView";
import {
  getADiscount,
  getAllDiscount,
  updateDiscount,
} from "../../api/discountApi";
import { IDiscount } from "../../interface/discount";
const populateDropdown = (
  container: HTMLSelectElement,
  options: { id: number; code: string }[]
) => {
  options.forEach((option: { id: number; code: string }) => {
    const opt = document.createElement("option");
    opt.value = option.id.toString();
    opt.text = option.code;
    container.appendChild(opt);
  });
};
export const render = async () => {
  const container = createElement("div", {
    className: "flex justify-center items-center",
  });
  container.innerHTML += CreateCouponView(true);
  const couponName = container.querySelector(
    "#coupon-name"
  ) as HTMLInputElement;
  const worth = container.querySelector("#coupon-worth") as HTMLInputElement;
  const fromDate = container.querySelector("#from-date") as HTMLDataElement;
  const toDate = container.querySelector("#to-date") as HTMLDataElement;

  const coupons = await getAllDiscount();
  const dropdown = container.querySelector(
    "#email-dropdown"
  ) as HTMLSelectElement;
  container.querySelector("#update-select")?.classList.toggle("hidden");
  container.querySelector("#update-form")?.classList.replace("flex", "hidden");

  populateDropdown(dropdown, coupons);
  let selectedCouponId = "1";
  let selectedOption: HTMLOptionElement | null = null;
  dropdown.addEventListener("change", (event) => {
    const target = event.target as HTMLSelectElement;
    selectedCouponId = target.value;

    selectedOption = target.selectedOptions[0];
  });
  container.querySelector("#checkBtn")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const discountInfo = await getADiscount(selectedOption!.textContent!);
    if (discountInfo) {
      container.querySelector("#checkBtn")?.classList.add("hidden");
      container.querySelector("#update-select")?.classList.toggle("hidden");
      container
        .querySelector("#update-form")
        ?.classList.replace("hidden", "flex");

      couponName.value = discountInfo.code;
      worth.value = "" + discountInfo.percentage * 100;
      fromDate.value = discountInfo.validFrom.substring(0, 10);
      toDate.value = discountInfo.validUntil.substring(0, 10);
    }
  });
  container.querySelector("#submit")!.addEventListener("click", async (e) => {
    e.preventDefault();

    const couponData: IDiscount = {
      code: couponName.value,
      percentage: +worth.value / 100,
      validFrom: new Date(fromDate.value).toISOString(),
      validUntil: new Date(toDate.value).toISOString(),
    };
    try {
      if (couponName.value.length == 0)
        toast("Input field cannot be empty", "danger");
      if (Number.isNaN(+worth.value)) {
        toast("Coupon worth must be number", "danger");
      } else {
        const update = await updateDiscount(+selectedCouponId, couponData);
        if (update && update.status == 200) {
          toast("Successfully Updated", "");
          selectedOption!.textContent = couponName.value;
        } else {
          toast("Something went wrong", "danger");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError)
        toast(error.response?.data.error, "danger");
    }
  });
  return container;
};
