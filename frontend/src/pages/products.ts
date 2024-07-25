import Card from "../components/utils/card";
import { getProductsArray } from "../components/products/render-products";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { cartStore, counterStore } from "../store";

// Define interfaces for your data structures
interface Product {
  id: number;
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
        dispatch(`/product/${category}`);
      });
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
        productElement
          .querySelector(".card")
          ?.addEventListener("click", (e) => {
            e.preventDefault();
            dispatch(`/product/${prod.category.category_name}/${prod.id}`);
          });

        productElement
          .querySelector(".plus")
          ?.addEventListener("click", (e) => {
            e.preventDefault();
            counterStore.dispatch({
              type: "INCREMENT",
              payload: { id: prod.id },
            });
          });
        productElement
          .querySelector(".minus")
          ?.addEventListener("click", (e) => {
            e.preventDefault();
            counterStore.dispatch({
              type: "DECREMENT",
              payload: { id: prod.id },
            });
          });
        const qty = productElement.querySelector(".quantity");
        counterStore.subscribe(
          (state) =>
            state[prod.id] <= prod.stock && (qty!.textContent = state[prod.id])
        );
        productElement
          .querySelector(".cart")
          ?.addEventListener("click", (e) => {
            e.preventDefault();
            const quantity = counterStore.getState();
            cartStore.dispatch({
              type: "INCREMENT",
              payload: { ...prod, stock: quantity[prod.id] },
            });
          });
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
