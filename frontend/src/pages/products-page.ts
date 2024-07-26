import Card from "../components/utils/BaseCard";
import { createElement } from "../utils/createElement";
import { dispatch } from "../utils/dispatch";
import { getProductsByCategories } from "../utils/productApi";

export const render = async (params: { category: string }) => {
  const container = createElement("div", {
    className: "flex flex-col justify-center gap-2 w-full  py-20 ",
  });
  const productsList = createElement("div", {
    className: "products-list grid grid-cols-4 w-full justify-center gap-4",
  });
  const products = await getProductsByCategories(params.category);
  products.forEach((prod: any) => {
    const productElement = createElement("div", {
      className: "product flex justify-center",
    });

    const card = Card({
      img: prod.pic,
      price: prod.selling_price,
      title: prod.product_name,
      qty: prod.stock,
      category: prod.category.category_name,
    });

    productElement.innerHTML += card;
    productElement.addEventListener("click", (e) => {
      e.preventDefault();
      dispatch(`/products/${prod.category.category_name}/${prod.id}`);
    });
    productsList.appendChild(productElement);
  });
  container.appendChild(productsList);
  return container;
};
