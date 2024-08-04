import { IProduct } from "../../interface/product";

export const ProductDetails = (
  details: IProduct & { description: string; avgRating: number },
  quantity: number
) => {
  return `
       
      <div class="w-3/4 mx-auto  py-8">
  <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row -mx-4">
      <div class="px-4 md:w-1/2 ">
        <div class="rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 max-w-[30rem] overflow-hidden  ">
          <img
            class="w-full h-full object-contain transition hover:scale-110  duration-300 ease-out"
            src=${details.pic}
            alt="Product Image"
          />
        </div>
        <div class="flex -mx-2 mb-4 justify-center max-w-[30rem]  ">
          <div class="w-max px-2">
        
    <button
      class=" cart block w-full select-none rounded-lg bg-orange-800 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
         ${details.stock == 0 ? "disabled" : ""}
    >
      Add to Cart
    </button>
    <button
      class=" remove-cart  w-full hidden select-none rounded-lg bg-orange-800 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
    >
  Remove from Cart
    </button>
          </div>
          <div class="hidden quantity-div justify-center items-center gap-1">
          <button data-prod="${details.id}" data-qty="${
    details.stock
  }" class="plus bg-orange-800 block w-maxselect-none text-white m-1 w-8 text-xl">+</button>
          <p class="quantity" data-id="${details.id}">${quantity}</p>
          <button data-prod="${
            details.id
          }" class="minus bg-orange-800 block w-maxselect-none text-white m-1 w-8 text-xl">-</button>
        </div>
        </div>
      </div>
      <div class=" px-4">
        <h2 class="text-2xl font-semibold text-orange-800 mb-2">${
          details.productName
        }</h2>

        <div class="flex mb-4">
          <div class="mr-4">
            <span class="font-semibold text-gray-700 text-lg">Price:</span>
            <span class="text-gray-600 text-lg">Rs. ${
              details.sellingPrice
            }</span>
          </div>
          <div class="mr-4">
            <span class="font-semibold text-gray-700 text-lg">Availability:</span>
            <span class="text-gray-600">${
              details.stock > 0 ? "In Stock" : "Out of Stock"
            }</span>
          </div>
          <div>
            <span class="font-semibold text-gray-700 text-lg">Quantity:</span>
            <span class="text-gray-600">${details.stock}</span>
          </div>
        </div>

        <div>
          <span class="font-semibold text-gray-700 text-lg">Description:</span>
          <p class="text-gray-600 text-lg mt-2">
   ${details.description}
          </p>
        </div>
       
        ${
          details.avgRating > 0
            ? `  <div
          class="flex items-center w-full rounded-lg lg:overflow-visible gap-2 mt-3"
        >
          <h3 >Rating:  </h3>
           <div class="star inline-flex items-center mb-1">
         </div>
        </div>
         `
            : ""
        }
      </div>
    </div>
  
    <div id="review-details" class="my-2">
    </div>
  </div>
</div>
    
    `;
};
