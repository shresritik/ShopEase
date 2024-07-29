export const ProductReview = (review: any) => {
  console.log(review);
  return `
    <div
  class="relative flex w-1/2 px-10 py-10 justify-center mx-auto bg-white flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
  <div
    class="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
    <img
      src="${review.pic}"
      alt=""
      class="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center" />
    <div class="flex w-full flex-col gap-0.5">
      <div class="flex items-center justify-between">
        <h5
          class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
         ${review.user}
        </h5>
        <div id="star-review" class="flex items-center gap-5">
        </div>
      </div>

    </div>
  </div>
  <div class="p-0 mb-6">
    <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
      ${review.name}
    </p>
  </div>
</div>  
    `;
};
