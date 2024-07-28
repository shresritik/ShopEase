import { CheckoutCard } from "../../interface/checkout";
export const CheckoutCardView = (prod: CheckoutCard) => {
  return `<div class="flex flex-col rounded-lg bg-white sm:flex-row border-b py-2">
          <img
            class="m-2 h-24 w-28 rounded-md border object-cover object-center"
            src="${prod.pic}"
            alt=""
          />
          <div class="flex w-full flex-col px-4 py-4">
            <span class="font-semibold">${prod.product_name}</span>
            <div class="flex justify-between items-center">
            <div class="flex flex-col">
            <p  text-gray-800">Quantity: ${prod.qty}</p>
            <p  text-gray-800">Category: ${prod.category}</p>
            </div>
            <div class="flex flex-col">
            <p class=" font-bold">Price: Rs. ${prod.selling_price}</p>
            <p class=" font-bold text-right">Subtotal: Rs. ${prod.subtotal}</p>
            </div>
            </div>
          </div>
        </div>`;
};
