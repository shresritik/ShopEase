import { ProductDetails } from "../components/products/ProductDetailsView";
import { cartStore, counterStore } from "../store";
import { createElement } from "../utils/createElement";
import { getProductDetails, getProductsByCategories } from "../api/productApi";
import startCover from "../assets/svg/star-cover.svg";
import { ProductReview } from "../components/products/ProductReview";
import { getReview } from "../api/reviewApi";
import { IReviewDetails } from "../interface/review";
import { IProduct } from "../interface/product";
import { CardWrapper } from "../components/card/CardWrapper";

export const render = async ({
  id,
  category,
}: {
  id: string;
  category: string;
}) => {
  const container = createElement("div", {
    className: "flex flex-col justify-center  gap-2 bg-gray-100 mx-auto",
  });

  const details = await getProductDetails(category, id);

  const productDetailsContainer = createElement("div", {
    id: "product-details-container",
  });
  const productList = createElement("div", {
    className: `flex justify-start
    gap-4 my-5 `,
  });
  container.appendChild(productDetailsContainer);
  const reviewDetailsContainer = createElement("div", {
    id: "review-details",
    className: "flex flex-col gap-4",
  });
  const similarProdDiv = createElement("div", {
    id: "review-details",
    className: "w-3/4 mx-auto ",
  });
  const titleDiv = createElement("div", {
    className: "w-3/4 mx-auto ",
  });
  container.appendChild(similarProdDiv);
  if (details.totalReview) {
    titleDiv.textContent = "Total Reviews: " + details.totalReview;
  }

  reviewDetailsContainer.prepend(titleDiv);
  container.appendChild(reviewDetailsContainer);
  let isInCart = false;

  function updateContent(state: [key: number]) {
    const counterState = state;
    if (!details) {
      productDetailsContainer.innerHTML = "Error";
    } else {
      const quantity = counterState[details.id!] || 0;
      productDetailsContainer.innerHTML = ProductDetails(details, quantity);
    }
    const res = productDetailsContainer.querySelector(".star");
    if (res) {
      res.innerHTML = "";
      for (let i = 0; i < details.avgRating; i++) {
        res.innerHTML += `<img src=${startCover} width="20">`;
      }
    }
    updateCartVisibility();
  }

  function updateCartVisibility() {
    const cartButton = productDetailsContainer.querySelector(".cart");
    const quantityDiv = productDetailsContainer.querySelector(".quantity-div");
    const removeCartButton =
      productDetailsContainer.querySelector(".remove-cart");

    if (isInCart) {
      cartButton?.classList.add("hidden");
      quantityDiv?.classList.replace("hidden", "flex");
      removeCartButton?.classList.remove("hidden");
    } else {
      cartButton?.classList.remove("hidden");
      quantityDiv?.classList.replace("flex", "hidden");
      removeCartButton?.classList.add("hidden");
    }
  }

  productDetailsContainer.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("plus")) {
      e.preventDefault();
      const currentState = counterStore.getState();
      const currentQty = currentState[details.id!] || 0;
      if (currentQty < details.stock) {
        counterStore.dispatch({
          type: "INCREMENT",
          payload: { id: details.id, qty: details.stock },
        });
      }
    } else if (target.classList.contains("minus")) {
      e.preventDefault();
      const currentState = counterStore.getState();
      const currentQty = currentState[details.id!] || 0;
      if (currentQty > 0) {
        counterStore.dispatch({
          type: "DECREMENT",
          payload: { id: details.id },
        });
      }
    } else if (target.classList.contains("cart")) {
      e.preventDefault();
      if (!isInCart) {
        const quantity = counterStore.getState();
        cartStore.dispatch({
          type: "INCREMENT",
          payload: {
            ...details,
            qty: quantity[details.id!] || 1,
            stock: details.stock,
          },
        });
        isInCart = true;
        updateCartVisibility();
      }
    } else if (target.classList.contains("remove-cart")) {
      e.preventDefault();
      if (isInCart) {
        cartStore.dispatch({
          type: "REMOVE",
          payload: { id: details.id },
        });
        counterStore.dispatch({
          type: "REMOVE",
          payload: { id: details.id },
        });
        isInCart = false;
        updateCartVisibility();
      }
    }
  });

  counterStore.subscribe(updateContent);
  updateContent(counterStore.getState());
  const firstProdName = details.productName.split(" ")[0];
  const similarDetails = await getProductsByCategories(category, {
    name: firstProdName,
  });
  const productArray = Object.entries(similarDetails)
    .filter(([key, value]) => key !== "meta" && typeof value === "object")
    .map(([_, product]) => product as IProduct);
  if (productArray.length > 1) {
    similarProdDiv.innerHTML += "<h1>Similar Products</h1>";
  }
  productArray.forEach((prod: IProduct) => {
    if (details.id != prod.id) {
      const productElement = CardWrapper(prod);
      productList.appendChild(productElement);
    }
  });
  similarProdDiv.appendChild(productList);
  const reviews = await getReview(details.id);
  reviews.forEach((review: IReviewDetails) => {
    const reviewInfo = {
      name: review.review!,
      user: review.user.name,
      pic: review.user.pic,
    };
    const reviewElement = createElement("div");
    reviewElement.innerHTML += ProductReview(reviewInfo);
    reviewDetailsContainer.appendChild(reviewElement);

    const star = reviewElement.querySelector("#star-review");
    if (star) {
      for (let i = 0; i < review.rating; i++) {
        star.innerHTML += `<img src=${startCover}>`;
      }
    }
  });

  return container;
};
