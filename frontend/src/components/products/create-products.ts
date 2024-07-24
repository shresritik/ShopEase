import { fetchUserProfile } from "../../utils/userApi";
import { createElement } from "../../utils/createElement";
import { fetchHtml } from "../../utils/fetchHtml";
import { createProduct, getCategories } from "../../utils/productApi";

const populateDropdown = (container: HTMLSelectElement, options: any) => {
  options.forEach((option: any) => {
    const opt = document.createElement("option");
    opt.value = option.id.toString();
    opt.text = option.category_name;
    container.appendChild(opt);
  });
};

export const render = async () => {
  const container = createElement("div", {
    className: "flex flex-col justify-center items-center",
  });
  const form = createElement("form", {
    className:
      "bg-white p-6 rounded shadow-md w-full mt-8 mb-2 w-80 sm:w-[33rem] ",
  });
  try {
    const user = await fetchUserProfile();
    const res = await fetchHtml("create-products");
    form.innerHTML = res;
    const productName = form.querySelector("#name") as HTMLInputElement;
    const description = form.querySelector("#description") as HTMLInputElement;
    const fileInput = form.querySelector("#file-upload") as HTMLInputElement;
    const costField = form.querySelector("#cost-input") as HTMLInputElement;
    const sellField = form.querySelector("#sales-input") as HTMLInputElement;
    let selectedCategoryId = user.id;
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
      const formData = new FormData();
      formData.append("product_name", productName.value);
      formData.append("description", description.value);
      if (fileInput?.files?.[0]) {
        formData.append("pic", fileInput.files[0]);
      }
      formData.append("cost_price", costField.value);
      formData.append("selling_price", sellField.value);
      formData.append("category_id", selectedCategoryId);
      try {
        const res = await createProduct(formData);
        console.log(res);
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
