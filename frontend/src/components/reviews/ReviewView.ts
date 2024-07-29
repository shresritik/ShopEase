export const ReviewView = () => {
  return `<div
  class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[5000]"
  id="review"
>
  <div
    class="relative top-20 mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white"
  >
    <div class="text-black text-xl close cursor-pointer text-right">X</div>
    <div class="mt-3 text-center">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Rate and Review
      </h3>
      <div class="mt-2 px-7 py-3">
        <div class="star flex justify-center space-x-1 mb-4"></div>
        <textarea
          id="review-area"
          class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          rows="4"
          placeholder="Write your review here..."
        ></textarea>
      </div>
      <div class="items-center px-4 py-3">
        <button
          id="review-btn"
          class="px-4 py-2 bg-gray-900 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit Review
        </button>
      </div>
    </div>
  </div>
</div>`;
};
