import { createElement } from "../utils/createElement";
import { getAllProducts, getProductsByCategories } from "../api/productApi";
import { MetaCart } from "../interface/product";
import * as Filter from "../components/filter/filter";
import { renderProducts } from "../components/products/products-page";
import filterICon from "../assets/svg/filter.svg";
import { removeLoader, showLoader } from "../utils/loader";
// get all products page, initially get all products and then change on basis of filter
export const render = async (params: {
  category: string;
}): Promise<HTMLElement> => {
  const pathname = window.location.pathname.split("/");
  const container = createElement("div", {
    className:
      "flex flex-col justify-center gap-2 py-5 px-5 md:py-10 md:px-20  ",
  });
  const divSection = createElement("div", { className: "flex items-start" });

  const page = createElement("div", {
    className: "  text-xl font-semibold  mb-10",
  });
  const categoryTitle = createElement("div", {
    className: "flex flex-col justify-center gap-2 text-orange-800  ",
  });
  const productList = createElement("div", {
    className: `page flex flex-wrap justify-center md:justify-start  w-full gap-2 mx-auto`,
  });
  const filterTitle = createElement("img", {
    src: filterICon,
    className: "w-full",
  });
  const pageButtons = createElement("div", {
    className: "flex justify-center gap-2",
  });
  const filterDiv = createElement("div", {
    className:
      "  fixed top-[6rem] block md:hidden text-left filter-drop w-9 text-orange-800 text-lg cursor-pointer z-50 bg-white rounded-full border border-gray-300 shadow-md p-2",
  });
  const loader = showLoader(container);
  setTimeout(async () => {
    try {
      let products: MetaCart | MetaCart[];
      if (pathname[pathname.length - 1] == "products") {
        const queryParam = new URLSearchParams(window.location.search);
        const pageValue = queryParam.get("page")!;
        const filterSection = await Filter.render(productList);
        const query = {
          size: "6",
          page: pageValue,
        };
        products = (await getAllProducts(query)) as MetaCart;

        divSection.appendChild(filterSection);
        filterTitle.addEventListener("click", () => {
          document.querySelector(".filter-section")?.classList.toggle("hidden");
        });
        const pageLength = products.meta.total / 6;
        for (let i = 0; i < pageLength; i++) {
          pageButtons.innerHTML += `  <button
            data-add="${i + 1}"
            class="add-more px-8 bg-orange-800 text-white py-2 mt-2 rounded-lg hover:shadow-lg hover:shadow-gray-900/15 transition duration-300"
            >
        ${i + 1}
            </button>`;
        }
        divSection.appendChild(productList);
        filterDiv.appendChild(filterTitle);
        container.appendChild(filterDiv);
        container.appendChild(divSection);
        container.appendChild(pageButtons);
        document.querySelectorAll<HTMLDivElement>(".add-more").forEach((el) => {
          el.addEventListener("click", async function (e) {
            window.history.pushState(null, "", "?page=" + this.dataset.add);
            const queryParam = new URLSearchParams(window.location.search);
            const pageValue = queryParam.get("page")!;
            e.preventDefault();
            if (pageValue) {
              const query = {
                size: "6",
                page: pageValue,
              };
              const products = await getAllProducts(query);
              renderProducts({ products, productList });
            }
          });
        });

        renderProducts({ products, productList });
      } else {
        products = (await getProductsByCategories(
          params.category
        )) as MetaCart[];
        categoryTitle.textContent += `
       ${products[0].category.categoryName}`;
        page.appendChild(categoryTitle);
        divSection.appendChild(productList);
        container.appendChild(page);
        container.appendChild(divSection);
        renderProducts({ products, productList });
      }
    } catch (error) {
      const errorMessage = createElement("div", { className: "error" });
      errorMessage.textContent = "An error occurred while loading products.";
      container.appendChild(errorMessage);
    } finally {
      removeLoader(container, loader);
    }
  }, 0);
  return container;
};
