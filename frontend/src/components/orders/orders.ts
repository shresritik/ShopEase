import { IOrderView, Order, OrderProduct } from "../../interface/order";
import { IUser } from "../../interface/user";
import { userProfileStore } from "../../store";
import { createElement } from "../../utils/createElement";
import { getAllOrders, getOrdersByUsers } from "../../utils/ordersApi";
import OrderView from "./OrderView";
import * as Review from "../reviews/review";
export const render = async () => {
  const container = createElement("div", {
    className: "flex flex-col justify-center items-center",
  });
  const user = userProfileStore.getState() as IUser;
  let allOrders = [];
  if (user.roleId == 1 || user.roleId == 2) {
    allOrders = await getAllOrders();
  } else {
    allOrders = await getOrdersByUsers(user.id!);
    if (!allOrders || allOrders.length == 0) {
      container.innerHTML += "<h1>You have not bought any products yet</h1>";
    }
  }
  if (allOrders || allOrders.length > 0) {
    let orderDetail = allOrders.map((order: any) => {
      return [
        {
          id: order.id,
          total_amount: +order.total_amount,
          user: order.user ? order.user.name : "",
          profit: order.profit,
          createdAt: order.createdAt,
          products: order.Order_Product.map((e: any) => [
            {
              category: e.category.category_name,
              net_amount: +e.net_amount,
              productName: e.product.product_name,
              selling_price: +e.product.selling_price,
              cost_price: +e.product.cost_price,
              pic: e.product.pic,
              quantity: e.quantity,
            },
          ]),
        },
      ];
    });
    orderDetail.forEach((data: any) => {
      container.innerHTML += OrderView(data, user.roleId);
    });

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
        openReviewModal(this.dataset.id!);
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
  }

  return container;
};
