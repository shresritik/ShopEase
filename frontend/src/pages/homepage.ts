import { getProductsArray } from "../components/products/render-products";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { CardWrapper } from "../components/card/CardWrapper";
import { IProduct, MetaCart } from "../interface/product";
import { getAllProducts } from "../api/productApi";
import { CategorizedProducts } from "../interface/categories";
//homepage
//first get all categories then loop through it and fetch their products limiting to size 4
export const render = async (): Promise<HTMLElement> => {
  const container = createElement("div", {
    className: "flex flex-col justify-center gap-2  md:w-max mx-auto",
  });
  try {
    const ratedWrapper = createElement("div", {
      className: " flex flex-col gap-4 flex-wrap ",
    });
    const ratedList = createElement("div", {
      className: "products-list flex gap-4 flex-wrap ",
    });

    const topRated: IProduct = await getAllProducts({ rating: "2" });
    if (topRated) {
      ratedWrapper.innerHTML +=
        "<h1 class='text-xl font-bold mt-16'>Top Rated Products</h1>";

      for (const prod of Object.values(topRated)) {
        if ("page" in prod) continue;
        const productElement = CardWrapper(prod);
        ratedList.appendChild(productElement);
      }
      ratedWrapper.appendChild(ratedList);
      container.appendChild(ratedWrapper);
    }
    let categorizedProducts = (await getProductsArray({
      size: "4",
    })) as CategorizedProducts;
    for (const [category, productsObj] of Object.entries(categorizedProducts)) {
      const products = Object.entries(productsObj)
        .filter(([key, value]) => key !== "meta" && typeof value === "object")
        .map(([_, product]) => product as MetaCart);

      // Only proceed if there are products in this category
      if (products.length > 0) {
        const categoryDiv = createElement("div", {
          className: "category p-2 md:p-10 ",
        });
        const categoryTitle = createElement("h1", {
          className: "text-xl font-bold mb-4",
        });
        const viewTitle = createElement("h1", {
          className: "view text-xl font-bold mb-4 cursor-pointer",
        });
        const titleDiv = createElement("div", {
          className: "title p-10 flex justify-between",
        });

        viewTitle.addEventListener("click", (e) => {
          e.preventDefault();
          dispatch(`/products/${category}`);
        });

        const productsList = createElement("div", {
          className: "products-list flex gap-4 flex-wrap ",
        });

        categoryTitle.textContent = category;
        viewTitle.textContent = "View All";

        products.forEach((prod: MetaCart) => {
          if (prod) {
            const productElement = CardWrapper(prod);
            productsList.appendChild(productElement);
          }
        });

        titleDiv.appendChild(categoryTitle);
        titleDiv.appendChild(viewTitle);
        categoryDiv.appendChild(productsList);
        container.appendChild(titleDiv);
        container.appendChild(categoryDiv);
      }
    }
  } catch (error) {
    console.error("Error in renderProducts:", error);
    const errorMessage = createElement("div", { className: "error" });
    errorMessage.textContent = "An error occurred while loading products.";
    container.appendChild(errorMessage);
  }

  return container;
};
