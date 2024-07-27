import {
  deleteUser,
  fetchUserProfile,
  getAllUsers,
} from "../../utils/userApi.ts";
import { removeToken } from "../../utils/auth.ts";
import { createElement } from "../../utils/createElement.ts";
import { dispatch } from "../../utils/dispatch.ts";
import { fetchHtml } from "../../utils/fetchHtml.ts";
import { deleteProduct, getAllProducts } from "../../utils/productApi.ts";

const populateDropdown = (container: HTMLSelectElement, options: any) => {
  options.forEach((option: any) => {
    const opt = document.createElement("option");
    opt.value = option.id.toString();
    opt.text = option.email || option.product_name;
    container.appendChild(opt);
  });
};

export const render = async (prod = false, forUsers: boolean = true) => {
  const container = createElement("div", {
    className: "flex justify-center items-center",
  });

  try {
    const user = await fetchUserProfile();
    const res = await fetchHtml("deleteNotification");
    container.innerHTML = res;

    let selectedUserId = user.id;
    let selectedOption: HTMLOptionElement | null = null;

    if (!forUsers) {
      const users = await getAllUsers();

      const dropdown = container.querySelector(
        "#email-dropdown"
      ) as HTMLSelectElement;
      populateDropdown(dropdown, users);
      container.querySelector(".select")?.classList.toggle("hidden");

      dropdown.addEventListener("change", (event) => {
        const target = event.target as HTMLSelectElement;
        selectedUserId = target.value;
        selectedOption = target.selectedOptions[0];
      });
    }
    if (prod) {
      const users = await getAllProducts();
      const dropdown = container.querySelector(
        "#email-dropdown"
      ) as HTMLSelectElement;
      populateDropdown(dropdown, users);
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
  } catch (error: any) {
    console.error("Error rendering delete notification:", error);
  }

  return container;
};
