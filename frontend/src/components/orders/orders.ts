import { IUser } from "../../interface/user";
import { userProfileStore } from "../../store";
import { createElement } from "../../utils/createElement";
import { getAllOrders, getOrdersByUsers } from "../../api/ordersApi";
import OrderView from "./OrderView";
import * as Review from "../reviews/review";
import { DateDropDownView } from "../utils/subview";
import { convertToISO } from "../../utils";
import { esewaCall, getPaymentForm } from "../../api/paymentApi";
import { toast } from "../../utils/toast";
import { Order, OrderDetail, OrderProduct } from "../../interface/order";
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

      const getOrders =
        user.roleId > 2
          ? () => getOrdersByUsers(user.id!, params)
          : () => getAllOrders(params);

      const filteredData = await getOrders();

      if (filteredData) {
        const filteredOrderDetail = mapOrdersToDetail(filteredData);
        renderOrders(container, filteredOrderDetail, user.roleId);
      }
    });
  if (user.roleId == 1) {
    const downloadAllBtn = createElement("button", {
      className: "bg-gray-900 text-white px-4 py-2 rounded my-4",
      textContent: "Download Report",
    });
    downloadAllBtn.addEventListener("click", () => downloadAllOrders(user));
    container.prepend(downloadAllBtn);
  }
};

const mapOrdersToDetail = (orders: Order[]): OrderDetail[][] => {
  return orders.map((order: Order) => [
    {
      id: order.id,
      totalAmount: +(order.totalAmount ?? 0),
      user: order.user ? order.user.name : "",
      profit: order.profit,
      vat: order.vat,
      status: order.status,
      discountValue: order.discount
        ? `${order.discount.percentage * 100}%`
        : "0%",
      discountCode: order.discount?.code,
      createdAt: order.createdAt,
      products: order.OrderProduct.map((e: OrderProduct) => [
        {
          category: e.category.categoryName,
          netAmount: +e.netAmount,
          productName: e.product.productName,
          sellingPrice: +e.product.sellingPrice,
          costPrice: +e.product.costPrice,
          pic: e.product.pic,
          quantity: e.quantity,
        },
      ]),
    },
  ]);
};
//review model logic
const setupReviewListeners = async (container: HTMLElement) => {
  const reviewModal = (await Review.render()) as HTMLElement;

  const closeReviewModal = () => {
    if (reviewModal.classList.contains("block")) {
      reviewModal.classList.add("hidden");
      reviewModal.classList.remove("block");
    }
  };

  function openReviewModal(product: string) {
    if (reviewModal.classList.contains("hidden")) {
      reviewModal.classList.remove("hidden");
      reviewModal.classList.add("block");
      reviewModal.setAttribute("data-review", product);
    }
  }

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.id === "review") {
      closeReviewModal();
    }
  };

  container.querySelectorAll<HTMLElement>(".btn").forEach((rate) =>
    rate.addEventListener("click", function (e) {
      e.preventDefault();

      openReviewModal(this.dataset.review!);
    })
  );

  const closeButton = reviewModal.querySelector(".close") as HTMLDivElement;
  closeButton.addEventListener("click", closeReviewModal);
  reviewModal.addEventListener("click", handleOutsideClick);

  const modalContent = reviewModal.querySelector(".relative") as HTMLElement;
  if (modalContent) {
    modalContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  document.body.appendChild(reviewModal);
};
//download or generate report in excel
const downloadAllOrders = async (user: IUser) => {
  const orders =
    user.roleId > 2 ? await getOrdersByUsers(user.id!) : await getAllOrders();

  if (!orders || orders.length === 0) {
    toast("No orders to download", "danger");
    return;
  }

  let csv =
    "Order ID,User,Total Amount,Profit,Status,Discount,Coupon,Created At,Products\n";
  // converting the orders to csv format
  orders.forEach((order: Order) => {
    const products = order.OrderProduct.map(
      (p: { product: { productName: string }; quantity: number }) =>
        `${p.product.productName}(${p.quantity})`
    ).join("; ");

    csv += `${order.id},${order.user?.name || ""},${order.totalAmount},${
      order.profit
    },${order.status},${order?.discount?.percentage! * 100 + "%"},${
      order?.discount?.code || ""
    },${order.createdAt},${products}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = createElement("a") as HTMLAnchorElement;
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "all_orders.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
