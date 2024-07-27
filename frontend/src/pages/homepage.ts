import { getProductsArray } from "../components/products/render-products";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { CardWrapper } from "../components/card/CardWrapper";
import { IProduct } from "../interface/product";

interface CategorizedProducts {
  [category: string]: IProduct[];
}
export const render = async (): Promise<HTMLElement> => {
  const container = createElement("div", {
    className: "flex flex-col justify-center gap-2  w-max mx-auto",
  });

  try {
    const categorizedProducts: CategorizedProducts = await getProductsArray();

    for (const [category, products] of Object.entries(categorizedProducts)) {
      const categoryDiv = createElement("div", {
        className: "category p-10 ",
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
      categoryTitle.textContent = category;
      viewTitle.textContent = "View All";
      titleDiv.appendChild(categoryTitle);
      titleDiv.appendChild(viewTitle);
      viewTitle.addEventListener("click", (e) => {
        e.preventDefault();
        dispatch(`/products/${category}`);
      });
      const productsList = createElement("div", {
        className: "products-list flex gap-4",
      });

      products.forEach((prod: IProduct) => {
        const productElement = CardWrapper(prod);
        productsList.appendChild(productElement);
      });
      categoryDiv.appendChild(productsList);
      container.appendChild(titleDiv);
      container.appendChild(categoryDiv);
    }
  } catch (error) {
    console.error("Error in renderProducts:", error);
    const errorMessage = createElement("div", { className: "error" });
    errorMessage.textContent = "An error occurred while loading products.";
    container.appendChild(errorMessage);
  }

  return container;
};
