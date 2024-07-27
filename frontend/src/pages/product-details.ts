import { cartStore, counterStore } from "../store";
import { isAuthenticated } from "../utils/auth";
import { createElement } from "../utils/createElement";
import { getProductDetails } from "../utils/productApi";

export const render = async ({
  id,
  category,
}: {
  id: string;
  category: string;
}) => {
  const container = createElement("div", {
    className: "flex flex-col justify-center gap-2   mx-auto",
  });
  const details = await getProductDetails(category, id);
  function updateContent(state: any) {
    const counterState = state;
    if (!details) container.innerHTML += "Error";
    else {
      const quantity = counterState[details.id!] || 0;
      container.innerHTML = `<div class="bg-gray-100 h-screen py-8">
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
            <span class="text-gray-600">$29.99</span>
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
        <div class="w-96 mt-10">
        Total Reviews:  ${!details.total_review ? 0 : details.total_review}
        ${
          isAuthenticated()
            ? `
          <div class="relative w-full min-w-[200px]">
            <textarea
              class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            ></textarea>
            <label
              class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
              Write Review
            </label>
            <button
              class="w-max bg-gray-900 text-white py-3 px-8 my-3 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
            >
              Submit
            </button>
          </div>
          `
            : ""
        }
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
  </div>
</div>
`;
    }
    const res = container.querySelector(".star");
    for (let i = 0; i < details.avg_rating; i++) {
      if (container) {
        res!.innerHTML += `

      <span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 text-yellow-700 cursor-pointer"
        >
          <path
            fill-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clip-rule="evenodd"
          ></path></svg></span
      >
    </div>`;
      }
    }

    container.querySelector(".plus")!.addEventListener("click", function (e) {
      e.preventDefault();
      counterStore.dispatch({
        type: "INCREMENT",
        payload: { id: details.id, qty: details.stock },
      });
    });

    container.querySelector(".minus")!.addEventListener("click", function (e) {
      e.preventDefault();
      counterStore.dispatch({
        type: "DECREMENT",
        payload: { id: details.id },
      });
    });
    container.querySelector(".cart")?.addEventListener("click", (e) => {
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

  return container;
};
