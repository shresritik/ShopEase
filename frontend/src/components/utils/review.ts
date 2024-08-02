//review model logic
import * as Review from "../reviews/review";

export const setupReviewListeners = async (container: HTMLElement) => {
  const reviewModal = (await Review.render()) as HTMLElement;

  const closeReviewModal = () => {
    if (reviewModal.classList.contains("block")) {
      reviewModal.classList.add("hidden");
      reviewModal.classList.remove("block");
    }
  };

  function openReviewModal(product: string) {
    if (reviewModal.classList.contains("hidden")) {
      reviewModal.classList.remove("hidden");
      reviewModal.classList.add("block");
      reviewModal.setAttribute("data-review", product);
    }
  }

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.id === "review") {
      closeReviewModal();
    }
  };

  container.querySelectorAll<HTMLElement>(".btn").forEach((rate) =>
    rate.addEventListener("click", function (e) {
      e.preventDefault();

      openReviewModal(this.dataset.review!);
    })
  );

  const closeButton = reviewModal.querySelector(".close") as HTMLDivElement;
  closeButton.addEventListener("click", closeReviewModal);
  reviewModal.addEventListener("click", handleOutsideClick);

  const modalContent = reviewModal.querySelector(".relative") as HTMLElement;
  if (modalContent) {
    modalContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  document.body.appendChild(reviewModal);
};
