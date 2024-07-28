import { userProfileStore } from "../../store";
import { createElement } from "../../utils/createElement";
import { getAllOrders, getOrdersByUsers } from "../../utils/ordersApi";
import OrderView from "./OrderView";

export const render = async () => {
  const container = createElement("div", {
    className: "flex flex-col justify-center items-center",
  });
  const user = userProfileStore.getState();
  let allOrders = [];
  if (user.roleId == 1 || user.roleId == 2) {
    allOrders = await getAllOrders();
  } else {
    allOrders = await getOrdersByUsers(user.id);
    if (!allOrders || allOrders.length == 0) {
      container.innerHTML += "<h1>You have not bought any products yet</h1>";
    }
  }
  if (allOrders || allOrders.length > 0) {
    console.log(allOrders);
    const orderData = allOrders.flatMap((order) => {
      return order.Order_Product.map((e) => {
        return {
          id: order.id,
          createdAt: order.createdAt,
          totalAmount: order.total_amount,
          category: e.category.category_name,
          subtotal: e.net_amount,
          name: e.product.product_name,
          pic: e.product.pic,
          quantity: e.quantity,
        };
      });
    });
    orderData.forEach((data, i) => {
      container.innerHTML += OrderView(data, i);
    });
  }

  return container;
};
