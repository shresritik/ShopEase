import { createElement } from "../../utils/createElement";
import {
  createProduct,
  getProductByName,
  updateProduct,
} from "../../api/productApi";
import { updateStore } from "../../store";
import { IUser } from "../../interface/user";
import { CreateProductView } from "../dashboard-view/CreateProductView";
import { toast } from "../../utils/toast";
import { getCategories } from "../../api/categoriesApi";
//options to choose the product
const populateDropdown = (
  container: HTMLSelectElement,
  options: { id: number; categoryName: string }[]
) => {
  options.forEach((option: { id: number; categoryName: string }) => {
    const opt = document.createElement("option");
    opt.value = option.id.toString();
    opt.text = option.categoryName;
    container.appendChild(opt);
  });
};
// create and update products page
export const render = async (create: boolean = true) => {
  const container = createElement("div", {
    className: "flex flex-col justify-center items-center",
  });
  const form = createElement("form", {
    className: "bg-white p-6 rounded shadow-md w-full  mb-2 w-1/2 sm:w-1/3 ",
  });
  try {
    let selectedCategoryId: string;

    const res = CreateProductView(create);
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
          productName.value = prodValue.productName;
          description.value = prodValue.description;
          costField.value = prodValue.costPrice;
          sellField.value = prodValue.sellingPrice;
          stockField.value = prodValue.stock;
          selectedCategoryId = "" + prodValue.categoryId;
        } else {
          toast("error", "danger");
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
      formData.append("productName", productName.value);
      formData.append("description", description.value);
      if (fileInput?.files?.[0]) {
        formData.append("product", fileInput.files[0]);
      }
      formData.append("costPrice", costField.value);
      formData.append("sellingPrice", sellField.value);
      formData.append(
        "categoryId",
        selectedCategoryId ? selectedCategoryId : "1"
      );
      formData.append("stock", stockField.value);

      try {
        if (productName.value.length == 0) return;
        if (create) {
          await createProduct(formData);
        } else {
          await updateProduct(state.id!, formData);
        }
        const successElement = form?.querySelector(".success") as HTMLElement;
        successElement?.classList.remove("hidden");
      } catch (error) {
        if (error instanceof Error) {
          const errorElement = form.querySelector(".error") as HTMLElement;
          errorElement.textContent = `${error}`;
          errorElement.classList.remove("hidden");
          toast(error.message, "danger");
        }
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      const errorElement = form.querySelector(".error") as HTMLElement;
      errorElement.textContent = `${error}`;
      errorElement.classList.remove("hidden");
      toast(error.message, "danger");
    }
  }
  container.append(form);
  return container;
};
