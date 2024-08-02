import { MetaCart } from "../../interface/product";
import { cartStore, counterStore } from "../../store";
import { CardFunction } from "../../types/card";
import { createElement } from "../../utils/createElement";
import { dispatch } from "../../utils/dispatch";
import Card from "./BaseCardView";
import starCover from "../../assets/svg/star-cover.svg";

// Card Wrapper dom manipulation with state updates
export function CardWrapper(prod: MetaCart) {
  const productElement = createElement("div", {
    className: "products",
  });
  const card = (Card as CardFunction)({
    img: prod.pic,
    price: prod.sellingPrice,
    title: prod.productName,
    qty: prod.stock,
    avgRating: prod?.avgRating && +prod.avgRating,
    category: prod.category?.categoryName,
  });

  productElement.innerHTML += card;
  if (prod.avgRating) {
    for (let i = 0; i < prod.avgRating; i++) {
      productElement.querySelector(".rate")!.innerHTML += `
      <div class="w-5"><img src="${starCover}"/></div>`;
    }
  }
  productElement.querySelector(".card")?.addEventListener("click", (e) => {
    e.preventDefault();
    dispatch(`/products/${prod.category.categoryName}/${prod.id}`);
  });

  productElement.querySelector(".plus")?.addEventListener("click", (e) => {
    e.preventDefault();
    counterStore.dispatch({
      type: "INCREMENT",
      payload: { id: +prod.id!, qty: prod.stock },
    });
  });
  productElement.querySelector(".minus")?.addEventListener("click", (e) => {
    e.preventDefault();
    counterStore.dispatch({
      type: "DECREMENT",
      payload: { id: +prod.id! },
    });
  });
  const qty = productElement.querySelector(".quantity");
  counterStore.subscribe((state) => {
    if (!state[prod.id!]) qty!.textContent = "0";
    else
      state[prod.id!] <= prod.stock &&
        (qty!.textContent = "" + state[prod.id!]);
  });

  productElement.querySelector(".cart")?.addEventListener("click", (e) => {
    e.preventDefault();

    const quantity = counterStore.getState();
    cartStore.dispatch({
      type: "INCREMENT",
      payload: {
        ...prod,
        qty: quantity[prod.id!],
        stock: prod.stock,
        category: prod.category,
      },
    });
    productElement.querySelector(".cart")!.classList.add("hidden");

    productElement
      .querySelector(".quantity-div")
      ?.classList.replace("hidden", "flex");
    productElement.querySelector(".remove-cart")!.classList.remove("hidden");
  });
  productElement
    .querySelector(".remove-cart")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      cartStore.dispatch({
        type: "REMOVE",
        payload: { id: prod?.id! },
      });
      counterStore.dispatch({
        type: "REMOVE",
        payload: prod.id!,
      });
      productElement.querySelector(".cart")!.classList.remove("hidden");

      productElement
        .querySelector(".quantity-div")
        ?.classList.replace("flex", "hidden");
      productElement.querySelector(".remove-cart")!.classList.add("hidden");
    });
  return productElement;
}
