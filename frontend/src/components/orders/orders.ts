import { IUser } from "../../interface/user";
import { userProfileStore } from "../../store";
import { createElement } from "../../utils/createElement";
import { getAllOrders, getOrdersByUsers } from "../../api/ordersApi";
import OrderView from "./OrderView";
import { DateDropDownView } from "../utils/subview";
import { convertToISO } from "../../utils";
import { esewaCall, getPaymentForm } from "../../api/paymentApi";
import { OrderDetail } from "../../interface/order";
import { downloadAllOrders, mapOrdersToDetail } from "../utils";
import { setupReviewListeners } from "../utils/review";
// orders page to display all orders to superadmin and only user's orders
const renderDateDropdown = (container: HTMLElement) => {
  const dropdownContainer = createElement("div", {
    id: "date-dropdown-container",
  });
  dropdownContainer.innerHTML = DateDropDownView();
  container.prepend(dropdownContainer);
};

const renderOrders = (
  container: HTMLElement,
  orderDetail: OrderDetail[][],
  userRoleId: number
) => {
  const ordersContainer =
    container.querySelector("#orders-container") ||
    createElement("div", { id: "orders-container" });
  ordersContainer.innerHTML = "";

  orderDetail.forEach((data: OrderDetail[]) => {
    ordersContainer.innerHTML += OrderView(data, userRoleId);
  });

  if (!container.contains(ordersContainer)) {
    container.appendChild(ordersContainer);
  }
  setupReviewListeners(container);
};
//filter on basis of date
const setupEventListeners = (container: HTMLElement, user: IUser) => {
  let selectedDay: number;

  container.querySelector("#date-drop")?.addEventListener("change", (event) => {
    const target = event.target as HTMLSelectElement;
    selectedDay = +target.value;
  });

  container
    .querySelector(".filter-drop")
    ?.addEventListener("click", async (e) => {
      e.preventDefault();
      const isoDate = selectedDay ? convertToISO(selectedDay) : null;
      const params = isoDate ? { q: isoDate } : undefined;
      const filteredData = await getAllOrders(params);

      if (filteredData) {
        const filteredOrderDetail = mapOrdersToDetail(filteredData);
        renderOrders(container, filteredOrderDetail, user.roleId);
      }
    });
  if (user.roleId == 1) {
    const downloadAllBtn = createElement("button", {
      className: "bg-orange-800 text-white px-4 py-2 rounded my-4",
      textContent: "Download Report",
    });
    downloadAllBtn.addEventListener("click", () => downloadAllOrders());
    container.prepend(downloadAllBtn);
  }
};

export const render = async () => {
  const container = createElement("div", {
    className: "flex flex-col justify-center items-center",
  });

  const user = userProfileStore.getState() as IUser;
  let allOrders = [];

  if (user.roleId == 1 || user.roleId == 2) {
    allOrders = await getAllOrders();
    if (!allOrders || allOrders.length == 0) {
      container.innerHTML += "<h1>Nobody bought any products yet</h1>";
    }
  } else {
    allOrders = await getOrdersByUsers(user.id!);
    if (!allOrders || allOrders.length == 0) {
      container.innerHTML += "<h1>You have not bought any products yet</h1>";
    }
  }

  if (allOrders && allOrders.length > 0) {
    renderDateDropdown(container);
    const orderDetail = mapOrdersToDetail(allOrders);
    renderOrders(container, orderDetail, user.roleId);
    setupEventListeners(container, user);
  }

  const pendingPayment =
    container.querySelectorAll<HTMLButtonElement>("#payment-data");
  pendingPayment.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const target = event.currentTarget as HTMLButtonElement;
      const productData = JSON.parse(target.dataset.pending!);

      const res = await getPaymentForm({
        ...productData,
        id: productData.id,
      });
      if (res) await esewaCall(res.data);
    });
  });
  return container;
};
