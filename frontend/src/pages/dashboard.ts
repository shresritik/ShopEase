import { removeToken } from "../utils/auth";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import * as Update from "../components/users/update-user";
import * as Delete from "../components/users/delete-user";
import * as DeleteCategory from "../components/categories/delete-category";
import * as User from "./register";
import * as Product from "../components/products/create-products";
import * as Category from "../components/categories/create-category";
import * as UpdateCategory from "../components/categories/update-category";
import * as Order from "../components/orders/orders";
import * as CreateCoupon from "../components/discount/create-discount";
import * as UpdateCoupon from "../components/discount/update-discount";
import * as DeleteCoupon from "../components/discount/delete-discount";
import { fetchUserProfile } from "../api/userApi";
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
  // const heading = createElement(
  //   "h1",
  //   { className: "text-3xl mb-4" },
  //   "Dashboard"
  // );

  // container.appendChild(heading);
  const renderSidebar = async () => {
    try {
      const user = await fetchUserProfile();
      const res = SidebarView();
      leftElement.innerHTML = res;

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
          rightElement.appendChild(createOrders);
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
        } else if (classArray.includes("update-user")) {
          const updateUser = await User.render(false, true);
          updateUser.classList.add("update-user");
          rightElement.appendChild(updateUser);
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
        } else if (classArray.includes("create-category")) {
          const createProduct = await Category.render();
          createProduct.classList.add("create-Product");
          rightElement.appendChild(createProduct);
        } else if (classArray.includes("delete-category")) {
          const deleteProduct = await DeleteCategory.render();
          deleteProduct.classList.add("delete-category");
          rightElement.appendChild(deleteProduct);
        } else if (classArray.includes("update-category")) {
          const updateProduct = await UpdateCategory.render();
          updateProduct.classList.add("update-category");
          rightElement.appendChild(updateProduct);
        } else if (classArray.includes("create-coupon")) {
          const createCoupon = await CreateCoupon.render();
          createCoupon.classList.add("create-coupon");
          rightElement.appendChild(createCoupon);
        } else if (classArray.includes("update-coupon")) {
          const updateCoupon = await UpdateCoupon.render();
          updateCoupon.classList.add("update-coupon");
          rightElement.appendChild(updateCoupon);
        } else if (classArray.includes("delete-coupon")) {
          const deleteCoupon = await DeleteCoupon.render();
          deleteCoupon.classList.add("delete-coupon");
          rightElement.appendChild(deleteCoupon);
        }
      };
      document.querySelectorAll("nav > div > button").forEach((button) => {
        button.addEventListener("click", () => {
          const content = button.nextElementSibling;
          content?.classList.toggle("hidden");
          button.querySelector("svg")!.classList.toggle("rotate-180");
        });
      });
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

  leftElement.querySelectorAll("nav > div > button").forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      content!.classList.toggle("hidden");
      button.querySelector("svg")!.classList.toggle("rotate-180");
    });
  });
  renderSidebar();

  divElement.appendChild(leftElement);
  divElement.appendChild(rightElement);
  container.appendChild(divElement);
  return container;
};
