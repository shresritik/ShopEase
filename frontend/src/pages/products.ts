import { createElement } from "../utils/createElement";
import { getAllProducts, getProductsByCategories } from "../api/productApi";
import { MetaCart } from "../interface/product";
import * as Filter from "../components/filter/filter";
import { renderProducts } from "../components/products/products-page";
// get all products page, initially get all products and then change on basis of filter
export const render = async (params: {
  category: string;
}): Promise<HTMLElement> => {
  const pathname = window.location.pathname.split("/");
  const container = createElement("div", {
    className: "flex flex-col justify-center gap-2 py-10 px-20  ",
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
  try {
    let products: MetaCart[];
    if (pathname[pathname.length - 1] == "products") {
      const filterSection = await Filter.render(productList);
      products = (await getAllProducts()) as MetaCart[];
      divSection.appendChild(filterSection);
      divSection.appendChild(productList);
      container.appendChild(divSection);
      renderProducts({ products, productList });
    } else {
      products = await getProductsByCategories(params.category);
      categoryTitle.textContent += `
       ${products[0].category.categoryName}`;
      page.appendChild(categoryTitle);
      divSection.appendChild(productList);
      container.appendChild(page);
      container.appendChild(divSection);
      renderProducts({ products, productList });
    }
  } catch (error) {
    console.error("Error in renderProducts:", error);
    const errorMessage = createElement("div", { className: "error" });
    errorMessage.textContent = "An error occurred while loading products.";
    container.appendChild(errorMessage);
  }

  return container;
};
