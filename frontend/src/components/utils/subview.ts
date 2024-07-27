export const TotalAmount = (totalAmount: number) => {
  return `
        <div class="flex flex-col justify-end items-center mt-4 gap-2">
          <h1 class="text-lg font-bold">Subtotal: Rs.${totalAmount}</h1>
        <button id="order" class=" block w-full select-none rounded-lg bg-orange-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-orange-900/10 transition-all hover:shadow-lg hover:shadow-orange-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">Order</button>
        <button id="reset" class="  block w-full select-none rounded-lg bg-gray-900 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >Reset</button>
          '
        </div>`;
};
