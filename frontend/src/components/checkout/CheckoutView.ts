import { userProfileStore } from "../../store";
import eSewaImg from "../../assets/images/esewa.png";
export const CheckoutView = () => {
  const user = userProfileStore.getState();
  return `
    <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  <div class="px-4 pt-8">
    <p class="text-xl font-medium">Order Summary</p>

    <div
      class="checkout-wrapper mt-8 rounded-lg border bg-white px-2 py-4 sm:px-6"
    ></div>
  </div>
  <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
    <p class="text-xl font-medium">Payment Details</p>
    <p class="text-gray-400">
      Complete your order by providing your payment details.
    </p>
    <div class="">
      <label for="email" class="mt-4 mb-2 block text-sm font-medium"
        >Email</label
      >
      <div class="relative">
        <input
          type="email"
          id="email"
          name="email"
          disabled
          required
          value="${user.email}"
          class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 "
          placeholder="your.email@gmail.com"
        />
      </div>

      <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium"
        >Billing Address</label
      >
      <div class="flex flex-col sm:flex-row">
        <div class="relative flex-shrink-0 w-full">
          <input
            type="text"
            id="billing-address"
            name="billing-address"
            required
            class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-gray-800 focus:ring-gray-800"
            placeholder="Address"
          />
        </div>
      </div>

      <!-- Total -->
      <div class="checkout-amount"></div>
    </div>
    <button
    type="button"
    id="payBtn"
      class="mt-4 mb-8 w-full flex justify-center items-center rounded-md bg-green-600 px-6 py-4 text-lg font-medium text-white hover:shadow-md transition duration-200 ease-out hover:shadow-gray-700/60"
    >
      <span>Pay via </span><img class="w-24" src="${eSewaImg}">
    </button>
  </div>
</div>

    
    `;
};
