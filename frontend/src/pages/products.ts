import { createElement } from "../utils/createElement";
import { getAllProducts, getProductsByCategories } from "../utils/productApi";
import { IProduct } from "../interface/product";
import * as Filter from "../components/filter/filter";
import { renderProducts } from "../components/products/products-page";

export const render = async (params: {
  category: string;
}): Promise<HTMLElement> => {
  const pathname = window.location.pathname.split("/");
  const container = createElement("div", {
    className: "flex flex-col justify-center gap-2 py-10 px-20  ",
  });
  const divSection = createElement("div", { className: "flex items-start" });

  const page = createElement("div", {
    className: "  text-xl font-bold px-20 mb-10",
  });
  const categoryTitle = createElement("div", {
    className: "flex flex-col justify-center gap-2   ",
  });
  const productList = createElement("div", {
    className: `page grid ${
      pathname[pathname.length - 1] == "products"
        ? "grid-cols-3"
        : "grid-cols-4"
    } justify-center gap-2 mx-auto`,
  });
  try {
    let products: IProduct[];
    if (pathname[pathname.length - 1] == "products") {
      const filterSection = await Filter.render(
        productList,
        divSection,
        page,
        container
      );
      products = await getAllProducts();
      divSection.appendChild(filterSection);
      divSection.appendChild(productList);
      container.appendChild(divSection);
      renderProducts({ products, productList, divSection, page, container });
    } else {
      products = await getProductsByCategories(params.category);
      categoryTitle.textContent += `
       ${products[0].category.category_name}`;
      page.appendChild(categoryTitle);
      divSection.appendChild(productList);
      container.appendChild(page);
      container.appendChild(divSection);
      renderProducts({ products, productList, divSection, page, container });
    }
  } catch (error) {
    console.error("Error in renderProducts:", error);
    const errorMessage = createElement("div", { className: "error" });
    errorMessage.textContent = "An error occurred while loading products.";
    container.appendChild(errorMessage);
  }

  return container;
};
