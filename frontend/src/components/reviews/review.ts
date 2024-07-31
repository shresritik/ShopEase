import { createElement } from "../../utils/createElement";
import starOutline from "../../assets/svg/star-outline.svg";
import starCover from "../../assets/svg/star-cover.svg";
import { ReviewView } from "./ReviewView";
import { userProfileStore } from "../../store";
import { IReview } from "../../interface/review";
import { createReview } from "../../api/reviewApi";
import { toast } from "../../utils/toast";
import { AxiosError } from "axios";
let active: number = 0;
export const render = async () => {
  const container = createElement("div", {
    className: "flex hidden ",
  });
  const userProfile = await userProfileStore.getState();
  container.innerHTML += ReviewView();
  const reviewText = container.querySelector(
    "#review-area"
  ) as HTMLInputElement;
  const reviewBtn = container.querySelector("#review-btn");
  for (let i = 0; i < 5; i++) {
    let starImg = createElement("img", {
      className: "star-style",
    }) as HTMLImageElement;
    starImg.src = starOutline;
    container.querySelector(".star")?.appendChild(starImg);
    starImg.addEventListener("mouseover", () => onStarHover(i));
    starImg.addEventListener("mouseleave", () => onStarOut());
    starImg.addEventListener("click", () => onStarClick(i));
  }
  let stars = container.querySelectorAll(
    ".star-style"
  ) as NodeListOf<HTMLImageElement>;
  function onStarHover(i: number) {
    fill(i);
  }
  function fill(ratingVal: number) {
    for (let i = 0; i < 5; i++) {
      if (i <= ratingVal) {
        stars[i].src = starCover;
      } else {
        stars[i].src = starOutline;
      }
    }
  }
  function onStarOut() {
    fill(active);
  }
  function onStarClick(i: number) {
    active = i;
    fill(active);
  }
  reviewBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const product = document.querySelector(".flex.block ") as HTMLElement;
    console.log(product);
    const data: IReview = {
      name: reviewText.value,
      userId: userProfile.id,
      product_name: product.dataset.review!,
      rating: active,
    };
    try {
      const postReview = await createReview(data);
      if (postReview) {
        toast("Review Successfully Posted", "");
      }
    } catch (error) {
      if (error instanceof AxiosError)
        toast(error.response!.data.error, "danger");
    }
  });
  return container;
};
