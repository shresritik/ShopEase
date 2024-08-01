import {
  deleteUser,
  fetchUserProfile,
  getAllUsers,
} from "../../api/userApi.ts";
import { removeToken } from "../../utils/auth.ts";
import { createElement } from "../../utils/createElement.ts";
import { dispatch } from "../../utils/dispatch.ts";
import { deleteProduct, getAllProducts } from "../../api/productApi.ts";
import { DeleteView } from "../dashboard-view/DeleteView.ts";
import { toast } from "../../utils/toast.ts";
import { userProfileStore } from "../../store.ts";
//dropdown to show all users
const populateDropdown = (
  container: HTMLSelectElement,
  options: { id: number; email: string; productName: string; role: string }[],
  roleId: number
) => {
  options.forEach(
    (option: {
      id: number;
      email: string;
      productName: string;
      role: string;
    }) => {
      const opt = document.createElement("option");
      if (option.role != "SUPER_ADMIN" && roleId > 1) {
        opt.value = option.id.toString();
        opt.text = option.email || option.productName;
      } else {
        opt.value = option.id.toString();
        opt.text = option.email || option.productName;
      }
      container.appendChild(opt);
    }
  );
};
// component to delete users and products
export const render = async (prod = false, forUsers: boolean = true) => {
  const container = createElement("div", {
    className: "flex justify-center items-center",
  });

  try {
    const user = await fetchUserProfile();
    const res = DeleteView(prod, false, false);
    container.innerHTML = res;
    let selectedUserId = user.id;
    let selectedOption: HTMLOptionElement | null = null;
    if (!forUsers) {
      const users = await getAllUsers();
      const dropdown = container.querySelector(
        "#email-dropdown"
      ) as HTMLSelectElement;
      populateDropdown(dropdown, users, user.roleId);
      container.querySelector(".select")?.classList.toggle("hidden");
      dropdown.addEventListener("change", (event) => {
        const target = event.target as HTMLSelectElement;
        selectedUserId = target.value;
        selectedOption = target.selectedOptions[0];
      });
    }
    if (prod) {
      const prod = await getAllProducts();
      const dropdown = container.querySelector(
        "#email-dropdown"
      ) as HTMLSelectElement;
      const products = Object.entries(prod)
        .filter(([key, value]) => key !== "meta" && typeof value === "object")
        .map(([_, product]) => product) as {
        id: number;
        email: string;
        productName: string;
        role: string;
      }[];
      populateDropdown(dropdown, products, 2);
      container.querySelector(".select")?.classList.toggle("hidden");

      dropdown.addEventListener("change", (event) => {
        const target = event.target as HTMLSelectElement;
        selectedUserId = target.value;
        selectedOption = target.selectedOptions[0];
      });
    }
    const deleteButton = container.querySelector("#deleteBtn");
    if (deleteButton) {
      deleteButton.addEventListener("click", async () => {
        if (!prod) {
          await deleteUser(selectedUserId);
          if (!forUsers) {
            const successElement = container.querySelector(
              ".success"
            ) as HTMLElement;
            successElement?.classList.remove("hidden");
            if (selectedOption) {
              selectedOption.remove();
            }
          } else {
            removeToken("accessToken");
            userProfileStore.dispatch({ type: "RESET" });
            dispatch("/");
          }
        } else {
          await deleteProduct(selectedUserId);
          const successElement = container.querySelector(
            ".success"
          ) as HTMLElement;
          successElement?.classList.remove("hidden");
          if (selectedOption) {
            selectedOption.remove();
          }
        }
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error rendering delete notification:", error);
      toast(error.message, "danger");
    }
  }
  return container;
};
