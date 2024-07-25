import Card from "../components/card";
import { getProductsArray } from "../components/products/render-products";
import { createElement } from "../utils/createElement";

// Define interfaces for your data structures
interface Product {
  pic: string;
  selling_price: number;
  product_name: string;
  stock: number;
  category: {
    category_name: string;
  };
}

interface CategorizedProducts {
  [category: string]: Product[];
}

// Define the type for the Card function
type CardFunction = (props: {
  img: string;
  price: number;
  title: string;
  qty: number;
  category: string;
}) => string;

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
      categoryTitle.textContent = category;
      categoryDiv.appendChild(categoryTitle);

      const productsList = createElement("div", {
        className: "products-list flex gap-4",
      });

      products.forEach((prod: Product) => {
        const productElement = createElement("div", {
          className: "product",
        });

        const card = (Card as CardFunction)({
          img: prod.pic,
          price: prod.selling_price,
          title: prod.product_name,
          qty: prod.stock,
          category: prod.category.category_name,
        });

        productElement.innerHTML += card;
        productsList.appendChild(productElement);
      });

      categoryDiv.appendChild(productsList);
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
