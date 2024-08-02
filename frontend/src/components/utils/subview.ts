export const TotalAmountView = (totalAmount: number) => {
  return `
        <div class="flex flex-col justify-end items-center mt-4 gap-2">
          <h1 class="text-lg font-bold">Total: Rs.${totalAmount}</h1>
       <button class=" checkout block select-none rounded-lg bg-orange-800 py-3.5 px-7 w-full text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" >Checkout</button>
        <button id="reset" class="  block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >Reset</button>
          '
        </div>`;
};
export const DateDropDownView = () => {
  return ` 
  <div class="flex justify-center items-center space-x-2 mb-5">
  <select
    id="date-drop"
    name="date-drop"
    class="block px-2 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-indigo-500"
  >
    <option value="" selected >All</option>
    <option value="7" >Last 7 days</option>
    <option value="15" >Last 15 days</option>
    <option value="30" >Last 30 days</option>
  </select>
  <button class="filter-drop bg-gray-900 px-5 text-white py-2">Filter</button>
  </div>`;
};
