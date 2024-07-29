import { createElement } from "../../utils/createElement";
import { fetchHtml } from "../../utils/fetchHtml";
import { getAllProducts, getCategories } from "../../utils/productApi";
import { renderProducts } from "../products/products-page";
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
export const render = async (
  productList: any,
  divSection: any,
  page: any,
  container: any
) => {
  let selectedCategoryId = "1";
  let selectedPriceValue = "0";
  let selectedInputValue = "1";

  const containerContent = createElement("div", {
    className: "flex flex-col justify-center items-center",
  });
  containerContent.innerHTML += await fetchHtml("filter");
  const priceValue = containerContent.querySelector("#priceValue");
  const priceRange = containerContent.querySelector("#priceRange");
  const filterBtn = containerContent.querySelector("#filterBtn");
  const search = containerContent.querySelector("#search") as HTMLInputElement;
  if (priceRange && priceValue) {
    priceRange.addEventListener("input", (e: any) => {
      selectedPriceValue = e.target.value;
      priceValue.textContent = `Rs. ${selectedPriceValue}`;
    });
    const categories = await getCategories();
    const dropdown = containerContent.querySelector(
      "#category-dropdown"
    ) as HTMLSelectElement;
    dropdown.addEventListener("change", (event) => {
      const target = event.target as HTMLSelectElement;
      selectedCategoryId = target.value;
    });
    populateDropdown(dropdown, categories);
  }
  const ratingRadios = containerContent.querySelectorAll(
    'input[name="rating"]'
  );

  ratingRadios.forEach((radio) => {
    radio.addEventListener("change", (e: any) => {
      selectedInputValue = e.target.value;
    });
  });

  filterBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const query = {
      name: search.value,
      category: selectedCategoryId,
      price: selectedPriceValue,
      rating: "" + selectedInputValue,
    };
    const products = await getAllProducts(query);
    renderProducts(products, productList, divSection, page, container);
  });
  return containerContent;
};
