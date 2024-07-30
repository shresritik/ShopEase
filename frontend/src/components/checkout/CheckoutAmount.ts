import { CheckoutCard } from "../../interface/checkout";
import { roundOff } from "../../utils";

export const CheckoutAmount = (
  amount: Pick<CheckoutCard, "subtotal" | "total">
) => {
  return `<div class="mt-6 border-t border-b py-2">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Subtotal</p>
            <p class="font-semibold text-gray-900">Rs. ${amount.subtotal}</p>
          </div>
          <div class="flex items-center justify-between">
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
