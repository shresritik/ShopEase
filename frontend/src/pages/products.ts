import { createElement } from "../utils/createElement";
import { getAllProducts, getProductsByCategories } from "../utils/productApi";
import { IProduct } from "../interface/product";
import { CardWrapper } from "../components/card/CardWrapper";

// Define interfaces for your data structures

interface CategorizedProducts {
  [category: string]: IProduct[];
}

// Define the type for the Card function

export const render = async (params: {
  category: string;
}): Promise<HTMLElement> => {
  const pathname = window.location.pathname.split("/");
  const container = createElement("div", {
    className: "flex flex-col justify-center gap-2 py-10 px-20  ",
  });
  const productList = createElement("div", {
    className: "grid grid-cols-4 justify-center gap-2 mx-auto",
  });
  const page = createElement("div", {
    className: "text-xl font-bold px-20 mb-10",
  });
  const categoryTitle = createElement("div", {
    className: "flex flex-col justify-center gap-2  mb-24 ",
  });

  try {
    let products: any;
    if (pathname[pathname.length - 1] == "products") {
      products = await getAllProducts();
    } else {
      categoryTitle.innerHTML += `
       ${params.category}`;
      products = await getProductsByCategories(params.category);
      page.appendChild(categoryTitle);
    }

    products.forEach((prod: IProduct) => {
      const productElement = CardWrapper(prod);
      productList.appendChild(productElement);
      container.appendChild(page);
    });
    page.appendChild(productList);
  } catch (error) {
    console.error("Error in renderProducts:", error);
    const errorMessage = createElement("div", { className: "error" });
    errorMessage.textContent = "An error occurred while loading products.";
    container.appendChild(errorMessage);
  }

  return container;
};
