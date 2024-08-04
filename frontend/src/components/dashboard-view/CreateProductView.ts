export const CreateProductView = (create = false) => {
  return `
    <div class="check">
  <div class="relative  mx-auto">
    <form class="bg-white">
      <input
        id="product"
        class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
        placeholder=" "
      /><label
        class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
        >Product Name
      </label>
      <button
        id="checkName"
        class="mt-6 block w-full select-none rounded-lg bg-orange-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        
      >
        Check
      </button>
    </form>
  </div>
</div>
<div class="flex flex-col mb-1 form">
  <h6
    class="block mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
  >
    Product Name
  </h6>
  <div class="relative h-11 w-full min-w-[200px]">
    <input
      id="name"
      placeholder="Product"
      class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    />
    <label
      class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
    ></label>
  </div>
  <div class="md:w-96 mt-3">
    <div class="relative w-full ">
      <textarea
        id="description"
        class="peer w-full h-full min-h-[100px] resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent p-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
        placeholder=" "
      ></textarea>
      <label
        class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
      >
        Description
      </label>
    </div>
  </div>
  <div class="py-2 bg-white rounded ">
    <label for="number-input" class="block text-gray-700 text-sm font-bold mb-2"
      >Cost Price</label
    >
    <input
      type="number"
      id="cost-input"
      name="number-input"
      min="0"
      step="1"
      class="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div class="py-2 bg-white rounded ">
    <label for="number-input" class="block text-gray-700 text-sm font-bold mb-2"
      >Selling Price</label
    >
    <input
      type="number"
      id="sales-input"
      name="number-input"
      min="0"
      step="1"
      class="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div class="py-2 bg-white rounded ">
    <label for="number-input" class="block text-gray-700 text-sm font-bold mb-2"
      >Stock</label
    >
    <input
      type="number"
      id="stock"
      name="number-input"
      min="0"
      step="1"
      class="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <!-- Component: Button large file input -->
  <h6
    class="block mt-5 -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900"
  >
    Upload Profile Picture
  </h6>
  <div
    class="relative inline-flex items-center w-full gap-2 my-6 text-sm border rounded border-slate-200 text-slate-500"
  >
  <input
    id="file-upload"
    name="file-upload"
    type="file"
    class="peer  [&::file-selector-button]:hidden py-5 px-3  "
  />
  <label
    for="file-upload"
    class="inline-flex items-center  h-12 absolute right-0  gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded cursor-pointer whitespace-nowrap bg-orange-800 focus-visible:outline-none peer-disabled:cursor-not-allowed peer-disabled:border-gray-900 peer-disabled:bg-orange-800"
  >
    Upload
  </label>
  </div>
  <div class="select relative inline-block w-full md:px-10">
    <label
      for="category-dropdown"
      class="block text-sm font-medium text-gray-700 mb-2"
      >Select Category</label
    >
    <select
      id="category-dropdown"
      name="category-dropdown"
      class="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-6 mb-3"
    >
      <!-- Options will be populated dynamically -->
    </select>
  </div>
  <!-- End Button large file input -->
  <div class="text-red-500 my-2 hidden error"></div>
  <div class="text-green-500 my-2 hidden success">
     Product ${!create ? "updated" : "created"}  successfully
  </div>
  <button
    class="mt-6 block w-full select-none rounded-lg bg-orange-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
  >
   ${!create ? "Update" : "Create"} 
  </button>
</div>

    `;
};
