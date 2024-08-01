import { IProduct } from "../../interface/product";

export const BaseCart = (
  prod: IProduct,
  quantity: number,
  prodTotal: number
) => {
  return `
      <div class="flex gap-4 justify-start items-center border-b-2 py-3">
        <img src="${prod.pic}" class="w-12 object-contain">
        <h1 class="w-28">${prod.productName}</h1>
        <div class="flex justify-center items-center gap-1">
          <button data-prod="${prod.id}" data-qty="${prod.stock}" class="plus bg-gray-900 block w-maxselect-none text-white m-1 w-8 text-xl">+</button>
          <p class="quantity" data-id="${prod.id}">${quantity}</p>
          <button data-prod="${prod.id}" class="minus bg-gray-900 block w-maxselect-none text-white m-1 w-8 text-xl">-</button>
        </div>
        <h1 class="w-10">Price: Rs.${prodTotal}</h1>
        <button data-prod="${prod.id}" class="remove bg-red-500 text-white px-5 py-2">X</button>
      </div>`;
};
