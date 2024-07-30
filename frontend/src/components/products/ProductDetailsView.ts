export const ProductDetails = (details: any, quantity: number) => {
  return `
       
      <div class="w-3/4 mx-auto  py-8">
  <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row -mx-4">
      <div class="px-4  md:flex-1">
        <div class="rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 w-[30rem]  ">
          <img
            class="w-full h-full object-contain"
            src=${details.pic}
            alt="Product Image"
          />
        </div>
        <div class="flex -mx-2 mb-4 justify-center w-[30rem] ">
          <div class="w-max px-2">
            <button
              class="cart w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
            >
              Add to Cart
            </button>
          </div>
          <div class="flex justify-center items-center gap-1">
          <button data-prod="${details.id}" data-qty="${
    details.stock
  }" class="plus bg-gray-900 block w-maxselect-none text-white m-1 w-8 text-xl">+</button>
          <p class="quantity" data-id="${details.id}">${quantity}</p>
          <button data-prod="${
            details.id
          }" class="minus bg-gray-900 block w-maxselect-none text-white m-1 w-8 text-xl">-</button>
        </div>
        </div>
      </div>
      <div class="md:flex-1 px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">${
          details.product_name
        }</h2>

        <div class="flex mb-4">
          <div class="mr-4">
            <span class="font-bold text-gray-700">Price:</span>
            <span class="text-gray-600">Rs. ${details.selling_price}</span>
          </div>
          <div>
            <span class="font-bold text-gray-700">Availability:</span>
            <span class="text-gray-600">${
              details.stock > 0 ? "In Stock" : "Out of Stock"
            }</span>
          </div>
        </div>

        <div>
          <span class="font-bold text-gray-700">Description:</span>
          <p class="text-gray-600 text-sm mt-2">
   ${details.description}
          </p>
        </div>
       
        ${
          details.avg_rating > 0
            ? `  <div
          class="flex items-center w-full rounded-lg lg:overflow-visible gap-2"
        >
          <h3>Rating: ${details.avg_rating} </h3>
           <div class="star inline-flex items-center mb-1">
         </div>
        </div>
         `
            : ""
        }
      </div>
    </div>
     <div id="similar-products" class="my-2">
    </div>
     ${
       details.total_review
         ? `  <div>
    <h1 class="my-8">Total Reviews ${details.total_review}</h1>
    </div>`
         : ""
     }
  
   
    <div id="review-details" class="my-2">
    </div>
  </div>
</div>
    
    `;
};
