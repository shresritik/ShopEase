import { removeToken } from "../utils/auth";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { fetchHtml } from "../utils/fetchHtml";
import * as Update from "../components/users/update-user";
import * as Delete from "../components/users/delete-user";
import * as User from "./register";
import * as Product from "../components/products/create-products";
import * as Order from "../components/orders/orders";
import { fetchUserProfile } from "../utils/userApi";
import { userProfileStore } from "../store";
import axios from "axios";
import { SidebarView } from "../components/admin-panel/SidebarView";

export const render = async () => {
  const container = createElement("div", { className: "p-6 bg-gray-100" });
  const divElement = createElement("div", { className: "flex item-center" });
  const leftElement = createElement("div", {
    className: "flex flex-col item-center  fixed top-30",
  });
  const rightElement = createElement("div", {
    className: "p-6 flex flex-col w-full",
  });
  const heading = createElement(
    "h1",
    { className: "text-3xl mb-4" },
    "Dashboard"
  );

  container.appendChild(heading);
  const renderSidebar = async () => {
    try {
      const user = await fetchUserProfile();
      const res = SidebarView();
      leftElement.innerHTML = res;
      if (user.roleId != 3) {
        // document.querySelector("#create-user")?.classList.toggle("hidden");
        // document.querySelector("#create-product")?.classList.toggle("hidden");
        // document.querySelector("#update-product")?.classList.toggle("hidden");
        // document.querySelector("#delete-product")?.classList.toggle("hidden");
      }
      if (user.roleId == 2) {
        rightElement.appendChild(await Product.render());
      } else {
        rightElement.appendChild(await Order.render());
      }
      const handleSidebarClick = async (event: Event) => {
        const target = event.target as HTMLElement;
        const classArray = [...target.classList];

        rightElement.innerHTML = "";

        if (classArray.includes("orders") && user.roleId != 2) {
          const createOrders = await Order.render();
          createOrders.classList.add("create-orders");
          container.classList.remove("h-[90vh]");

          rightElement.appendChild(createOrders);
        } else if (classArray.includes("profile")) {
          const update = await Update.render();
          update.classList.add("profile-update");
          container.classList.remove("h-[90vh]");
          rightElement.appendChild(update);
        } else if (classArray.includes("delete")) {
          container.classList.add("h-[90vh]");
          const deleteUser = await Delete.render(
            false,
            user.roleId != 3 ? false : true
          );
          deleteUser.classList.add("delete-user");
          rightElement.appendChild(deleteUser);
        } else if (classArray.includes("create-user")) {
          const createUser = await User.render(false);
          container.classList.remove("h-[90vh]");

          createUser.classList.add("create-user");
          rightElement.appendChild(createUser);
        } else if (classArray.includes("create-product")) {
          const createProduct = await Product.render();
          container.classList.remove("h-[90vh]");
          createProduct.classList.add("create-product");
          rightElement.appendChild(createProduct);
        } else if (classArray.includes("update-product")) {
          const createProduct = await Product.render(false);
          container.classList.add("h-[90vh]");
          createProduct.classList.add("update-Product");
          rightElement.appendChild(createProduct);
        } else if (classArray.includes("delete-product")) {
          const deleteProduct = await Delete.render(true);
          container.classList.add("h-[90vh]");
          deleteProduct.classList.add("delete-Product");
          rightElement.appendChild(deleteProduct);
        }
      };

      document
        .querySelectorAll(".sidebar")
        .forEach((element) =>
          element.addEventListener("click", handleSidebarClick)
        );
    } catch (error: unknown) {
      console.error("Error fetching sidebar:", error);
      if (axios.isAxiosError(error)) alert(error.response?.data.error);
      removeToken("accessToken");
      userProfileStore.dispatch({ type: "RESET" });
      dispatch("/login");
    }
  };

  renderSidebar();

  divElement.appendChild(leftElement);
  divElement.appendChild(rightElement);
  container.appendChild(divElement);
  return container;
};
