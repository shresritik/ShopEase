export const DeleteView = (prod = false, category = false, coupon = false) => {
  return `
  

    <div
  class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
>
  <div class="p-6">
    <h5
      class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"
    >
      Are you sure you want to delete?
    </h5>
    <p
      class="block font-sans text-base antialiased font-light leading-relaxed text-inherit"
    >
      It will delete all its history.
    </p>
  </div>
  <div class="select relative hidden w-full px-5">
    <label
      for="email-dropdown"
      class="block text-sm font-medium text-gray-700 mb-2"
      > Select ${prod && !category && !coupon ? "Product" : ""} ${
    category && !prod && !coupon ? "Category" : ""
  }

  ${!category && !prod && coupon ? "Coupon" : ""}

  </label
    >
    <select
      id="email-dropdown"
      name="email-dropdown"
      class="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-6 mb-3"
    >
      <option>-----</option>
      <!-- Options will be populated dynamically -->
    </select>
  </div>
  <div class="p-5 pt-0">
    <button
      id="deleteBtn"
      class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-900 text-white shadow-md shadow-red-900/10 hover:shadow-lg hover:shadow-red-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button"
    >
      Yes
    </button>
    <div class="text-green-500 my-2 hidden success">
    ${prod && !category ? "Product" : "User"} ${
    category && !prod ? "Category" : ""
  } deleted successfully
    </div>
  </div>
</div>

    
    `;
};
