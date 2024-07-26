import Card from "../components/utils/card";
import { getProductsArray } from "../components/products/render-products";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { cartStore, counterStore } from "../store";
import { getAllProducts, getProductsByCategories } from "../utils/productApi";

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

    products.forEach((prod: Product) => {
      const productElement = createElement("div", {
        className: "products",
      });

      const card = (Card as CardFunction)({
        img: prod.pic,
        price: prod.selling_price,
        title: prod.product_name,
        qty: prod.stock,
        category: prod.category.category_name,
      });

      productElement.innerHTML += card;
      productElement.querySelector(".card")?.addEventListener("click", (e) => {
        e.preventDefault();
        dispatch(`/products/${prod.category.category_name}/${prod.id}`);
      });

      productElement.querySelector(".plus")?.addEventListener("click", (e) => {
        e.preventDefault();
        counterStore.dispatch({
          type: "INCREMENT",
          payload: { id: prod.id, qty: prod.stock },
        });
      });
      productElement.querySelector(".minus")?.addEventListener("click", (e) => {
        e.preventDefault();
        counterStore.dispatch({
          type: "DECREMENT",
          payload: { id: prod.id },
        });
      });
      const qty = productElement.querySelector(".quantity");
      counterStore.subscribe((state) => {
        if (!state[prod.id]) qty!.textContent = "0";
        else
          state[prod.id] <= prod.stock && (qty!.textContent = state[prod.id]);
      });
      productElement.querySelector(".cart")?.addEventListener("click", (e) => {
        e.preventDefault();
        const quantity = counterStore.getState();
        cartStore.dispatch({
          type: "INCREMENT",
          payload: { ...prod, qty: quantity[prod.id], stock: prod.stock },
        });
      });
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
