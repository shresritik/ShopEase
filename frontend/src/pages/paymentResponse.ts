import axios from "axios";
import { cartStore } from "../store";
import { createElement } from "../utils/createElement";
import { successEsewa } from "../api/paymentApi";
import { toast } from "../utils/toast";

export const render = async () => {
  const container = createElement("div", {
    className: "flex justify-center items-center h-screen",
  });
  try {
    const search = new URLSearchParams(window.location.search);
    const query = search.get("data");
    const val = await successEsewa(query!);
    if (val.data.status == "complete") {
      container.innerHTML = "Order complete success";
    } else {
      container.innerHTML = "Order failed";
    }
    cartStore.dispatch({ type: "RESET" });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) toast(error.response!.data.error, "danger");
  }
  return container;
};
