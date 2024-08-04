import axios from "axios";
import { cartStore } from "../store";
import { createElement } from "../utils/createElement";
import { successEsewa } from "../api/paymentApi";
import { toast } from "../utils/toast";
import { getOrderById } from "../api/ordersApi";
import { mapOrdersToDetail } from "../components/utils";
import { OrderDetail } from "../interface/order";
import OrderView from "../components/orders/OrderView";
import { setupReviewListeners } from "../components/utils/review";
//response page after esewa completion
export const render = async () => {
  const container = createElement("div", {
    className: "flex flex-col space-y-2 justify-center items-center h-[90vh]",
  });
  try {
    const search = new URLSearchParams(window.location.search);
    const query = search.get("data");
    const val = await successEsewa(query!);

    if (val && val.data.status == "complete") {
      const id = val.data.id;
      const order = await getOrderById(id);
      const filteredOrderDetail = mapOrdersToDetail([order]);
      container.innerHTML +=
        "<h1 class='text-lg text-green-600'>Order completed successfully</h1>";
      filteredOrderDetail.forEach((data: OrderDetail[]) => {
        container.innerHTML += OrderView(data, 3);
      });
      setupReviewListeners(container);
    } else {
      container.innerHTML =
        "<h1 class='text-lg text-red-600'>Order failed</h1>";
    }
    cartStore.dispatch({ type: "RESET" });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) toast(error.response!.data.error, "danger");
  }
  return container;
};
