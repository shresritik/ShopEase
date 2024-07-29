import { removeToken } from "../utils/auth";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { fetchHtml } from "../utils/fetchHtml";
import * as Update from "../components/users/update-user";
import * as Delete from "../components/users/deleteUser";
import * as User from "./register";
import * as Product from "../components/products/create-products";
import * as Order from "../components/orders/orders";
import { fetchUserProfile } from "../utils/userApi";
import { userProfileStore } from "../store";
import axios from "axios";

export const render = async () => {
  const container = createElement("div", { className: "p-6" });
  const divElement = createElement("div", { className: "flex item-center" });
  const leftElement = createElement("div", {
    className: "flex flex-col item-center",
  });
  const rightElement = createElement("div", {
    className: "p-6 flex flex-col w-full",
  });
  const heading = createElement(
    "h1",
    { className: "text-3xl mb-4" },
    "Dashboard"
  );
  const logoutButton = createElement(
    "button",
    { className: "bg-red-500 text-white p-2 rounded" },
    "Logout"
  );
  container.appendChild(heading);
  const renderSidebar = async () => {
    try {
      const user = await fetchUserProfile();
      const res = await fetchHtml("sidebar");
      leftElement.innerHTML = res;
      if (user.roleId != 3) {
        document.querySelector("#create-user")?.classList.toggle("hidden");
        document.querySelector("#create-product")?.classList.toggle("hidden");
        document.querySelector("#update-product")?.classList.toggle("hidden");
        document.querySelector("#delete-product")?.classList.toggle("hidden");
      }
      rightElement.appendChild(await Order.render());
      const handleSidebarClick = async (event: Event) => {
        const target = event.target as HTMLElement;
        const classArray = [...target.classList];

        rightElement.innerHTML = "";

        if (classArray.includes("orders")) {
          const createOrders = await Order.render();
          createOrders.classList.add("create-orders");
          rightElement.appendChild(createOrders);
          // Add orders related content here
        } else if (classArray.includes("profile")) {
          const update = await Update.render();
          update.classList.add("profile-update");
          rightElement.appendChild(update);
        } else if (classArray.includes("delete")) {
          const deleteUser = await Delete.render(
            false,
            user.roleId != 3 ? false : true
          );
          deleteUser.classList.add("delete-user");
          rightElement.appendChild(deleteUser);
        } else if (classArray.includes("create-user")) {
          const createUser = await User.render(false);

          createUser.classList.add("create-user");
          rightElement.appendChild(createUser);
        } else if (classArray.includes("create-product")) {
          const createProduct = await Product.render();

          createProduct.classList.add("create-product");
          rightElement.appendChild(createProduct);
        } else if (classArray.includes("update-product")) {
          const createProduct = await Product.render(false);

          createProduct.classList.add("update-Product");
          rightElement.appendChild(createProduct);
        } else if (classArray.includes("delete-product")) {
          const deleteProduct = await Delete.render(true);

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

  logoutButton.addEventListener("click", () => {
    removeToken("accessToken");
    userProfileStore.dispatch({ type: "RESET" });
    dispatch("/login");
  });

  divElement.appendChild(leftElement);
  divElement.appendChild(rightElement);
  container.appendChild(divElement);
  container.appendChild(logoutButton);
  return container;
};
