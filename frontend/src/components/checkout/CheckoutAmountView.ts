import { CheckoutCard } from "../../interface/checkout";
import { roundOff } from "../../utils";

export const CheckoutAmount = (
  amount: Pick<CheckoutCard, "subtotal" | "total">
) => {
  return `<div class="mt-6 border-t border-b py-2">
         
          <div class="flex items-center justify-between my-2">
            <p class="text-sm font-medium text-gray-900">Discount</p>
            <div class="flex items-end justify-end gap-2">

            <input id="discount" placeholder="COUPON" class=" w-1/2 py-2 text-gray-900 ring-gray-800 border border-gray-500 rounded-md px-3">
            <span id="discountValue" class="hidden text-gray-900 font-medium"></span>
            <button id="discountBtn" class="bg-orange-800 text-white px-4 rounded-md py-2 hover:shadow-md hover:shadow-gray-700/30">Check</button>
            </div>
          </div>
           <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Subtotal</p>
            <p class="font-semibold text-gray-900">Rs. ${amount.subtotal}</p>
          </div>
          <div class="flex items-center justify-between my-2">
          
            <p class="text-sm font-medium text-gray-900">VAT 13%</p>
            <p class="font-semibold text-gray-900">
          ${roundOff(amount.total - amount.subtotal)}</p>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-between">
          <p class="text-sm font-medium text-gray-900">Total</p>
          <p class="text-2xl font-semibold text-gray-900">Rs. ${
            amount.total
          }</p>
        </div>
        `;
};
