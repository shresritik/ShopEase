import { createElement } from "../../utils/createElement";
import { fetchHtml } from "../../utils/fetchHtml";
import {
  createProduct,
  getCategories,
  getProductByName,
  updateProduct,
} from "../../utils/productApi";
import { updateStore } from "../../store";
import { IUser } from "../../interface/user";

const populateDropdown = (
  container: HTMLSelectElement,
  options: { id: number; category_name: string }[]
) => {
  options.forEach((option: { id: number; category_name: string }) => {
    const opt = document.createElement("option");
    opt.value = option.id.toString();
    opt.text = option.category_name;
    container.appendChild(opt);
  });
};

export const render = async (create: boolean = true) => {
  const container = createElement("div", {
    className: "flex flex-col justify-center items-center",
  });
  const form = createElement("form", {
    className:
      "bg-white p-6 rounded shadow-md w-full mt-8 mb-2 w-80 sm:w-[33rem] ",
  });
  try {
    let selectedCategoryId: string;

    const res = await fetchHtml("create-products");
    form.innerHTML = res;
    const productName = form.querySelector("#name") as HTMLInputElement;
    const description = form.querySelector("#description") as HTMLInputElement;
    const fileInput = form.querySelector("#file-upload") as HTMLInputElement;
    const costField = form.querySelector("#cost-input") as HTMLInputElement;
    const sellField = form.querySelector("#sales-input") as HTMLInputElement;
    const stockField = form.querySelector("#stock") as HTMLInputElement;
    if (!create) {
      form.querySelector(".form")?.classList.add("hidden");

      const product = form.querySelector("#product") as HTMLInputElement;
      form.querySelector("#checkName")?.addEventListener("click", async (e) => {
        e.preventDefault();
        const prodValue = await getProductByName(product.value);
        if (prodValue) {
          updateStore.dispatch({ type: "STORE", payload: prodValue });
          form.querySelector(".form")?.classList.remove("hidden");
          form.querySelector(".check")?.classList.add("hidden");
          productName.value = prodValue.product_name;
          description.value = prodValue.description;
          costField.value = prodValue.cost_price;
          sellField.value = prodValue.selling_price;
          stockField.value = prodValue.stock;
          selectedCategoryId = "" + prodValue.category_id;
        } else {
          console.log("error");
        }
      });
    } else {
      form.querySelector(".check")?.classList.add("hidden");
    }
    const categories = await getCategories();
    const dropdown = form.querySelector(
      "#category-dropdown"
    ) as HTMLSelectElement;
    populateDropdown(dropdown, categories);
    dropdown.addEventListener("change", (event) => {
      const target = event.target as HTMLSelectElement;
      selectedCategoryId = target.value;
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const state = updateStore.getState() as IUser;
      const formData = new FormData();
      formData.append("product_name", productName.value);
      formData.append("description", description.value);
      if (fileInput?.files?.[0]) {
        formData.append("product", fileInput.files[0]);
      }
      formData.append("cost_price", costField.value);
      formData.append("selling_price", sellField.value);
      formData.append(
        "category_id",
        selectedCategoryId ? selectedCategoryId : "Dairy"
      );
      formData.append("stock", stockField.value);

      try {
        if (create) {
          const created = await createProduct(formData);
          console.log(created);
        } else {
          const updated = await updateProduct(state.id!, formData);
          console.log(updated);
        }
        const successElement = form?.querySelector(".success") as HTMLElement;
        successElement?.classList.remove("hidden");
      } catch (error) {
        const errorElement = form.querySelector(".error") as HTMLElement;
        errorElement.textContent = `${error}`;
        errorElement.classList.remove("hidden");
      }
    });
  } catch (error) {
    const errorElement = form.querySelector(".error") as HTMLElement;
    errorElement.textContent = `${error}`;
    errorElement.classList.remove("hidden");
  }
  container.append(form);
  return container;
};
