import { createElement } from "../../utils/createElement";
import { fetchHtml } from "../../utils/fetchHtml";
import { getAllProducts, getCategories } from "../../utils/productApi";
import { renderProducts } from "../products/products-page";

interface FilterState {
  categoryId: string;
  price: string;
  rating: string;
  search: string;
}

const populateDropdown = (
  container: HTMLSelectElement,
  options: { id: number; category_name: string }[]
) => {
  const allOption = document.createElement("option");
  (allOption.value = ""), (allOption.text = "All");
  container.appendChild(allOption);
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.id.toString();
    opt.text = option.category_name;
    container.appendChild(opt);
  });
};

export const render = async (
  productList: HTMLElement,
  divSection: HTMLElement,
  page: HTMLElement,
  container: HTMLElement
) => {
  const filterState: FilterState = {
    categoryId: "1",
    price: "0",
    rating: "1",
    search: "",
  };

  const filterContent = createElement("div", {
    className: "flex flex-col justify-center items-center",
  });
  filterContent.innerHTML = await fetchHtml("filter");

  const priceValue = filterContent.querySelector("#priceValue");
  const priceRange = filterContent.querySelector(
    "#priceRange"
  ) as HTMLInputElement;
  const filterBtn = filterContent.querySelector("#filterBtn");
  const search = filterContent.querySelector("#search") as HTMLInputElement;
  const dropdown = filterContent.querySelector(
    "#category-dropdown"
  ) as HTMLSelectElement;

  if (priceRange && priceValue) {
    priceRange.addEventListener("input", (e: Event) => {
      filterState.price = (e.target as HTMLInputElement).value;
      priceValue.textContent = `Rs. ${filterState.price}`;
    });

    const categories = await getCategories();
    populateDropdown(dropdown, categories);
  }

  dropdown.addEventListener("change", (event: Event) => {
    filterState.categoryId = (event.target as HTMLSelectElement).value;
  });

  const ratingRadios = filterContent.querySelectorAll<HTMLInputElement>(
    'input[name="rating"]'
  );

  ratingRadios.forEach((radio) => {
    radio.addEventListener("change", (e: Event) => {
      filterState.rating = (e.target as HTMLInputElement).value;
    });
  });

  const applyFilters = async () => {
    const query = {
      name: search.value,
      category: filterState.categoryId,
      price: filterState.price,
      rating: filterState.rating,
    };
    const products = await getAllProducts(query);
    renderProducts({ products, productList });
  };

  filterBtn?.addEventListener("click", (e: Event) => {
    e.preventDefault();
    applyFilters();
  });

  // Initial render
  await applyFilters();

  return filterContent;
};
