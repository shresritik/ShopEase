import { ProductDetails } from "../components/products/ProductDetailsView";
import { cartStore, counterStore } from "../store";
import { createElement } from "../utils/createElement";
import {
  getAllProducts,
  getProductDetails,
  getProductsByCategories,
} from "../utils/productApi";
import startCover from "../assets/svg/star-cover.svg";
import { ProductReview } from "../components/products/ProductReview";
import { getReview } from "../utils/reviewApi";
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
  container.appendChild(reviewDetailsContainer);

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
      for (let i = 0; i < details.avg_rating; i++) {
        res.innerHTML += `<img src=${startCover} width="20">`;
      }
    }
    attachEventListeners();
  }

  function attachEventListeners() {
    productDetailsContainer
      .querySelector(".plus")
      ?.addEventListener("click", function (e) {
        e.preventDefault();
        counterStore.dispatch({
          type: "INCREMENT",
          payload: { id: details.id, qty: details.stock },
        });
      });

    productDetailsContainer
      .querySelector(".minus")
      ?.addEventListener("click", function (e) {
        e.preventDefault();
        counterStore.dispatch({
          type: "DECREMENT",
          payload: { id: details.id },
        });
      });

    productDetailsContainer
      .querySelector(".cart")
      ?.addEventListener("click", (e) => {
        e.preventDefault();
        const quantity = counterStore.getState();
        cartStore.dispatch({
          type: "INCREMENT",
          payload: {
            ...details,
            qty: quantity[details.id!],
            stock: details.stock,
          },
        });
      });
  }

  counterStore.subscribe(updateContent);
  updateContent(counterStore.getState());
  const firstProdName = details.product_name.split(" ")[0];
  const similarDetails = await getProductsByCategories(category, {
    name: firstProdName,
  });
  const similarProdDiv = container.querySelector(
    "#similar-products"
  ) as HTMLDivElement;
  const productArray = Object.entries(similarDetails)
    .filter(([key, value]) => key !== "meta" && typeof value === "object")
    .map(([_, product]) => product as IProduct);
  if (productArray.length > 0) {
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
      name: review.review,
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
