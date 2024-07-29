import { IOrderView } from "../../interface/order";

const OrderView = (order: IOrderView, index: number, userRole: number) => {
  return `<div class="w-full md:w-1/2 px-4 sm:px-6 lg:px-8">


  <div class="w-full mb-3">
    <div class="rounded-3xl bg-white shadow-lg">
      <div class="px-4 py-6 sm:px-8 sm:py-10">
        <div class="flow-root w-full">
          <ul class="-my-8">
            <div
              class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 w-full"
            >
           <div>
                <h1 class="font-semibold">${index + 1}. Order ID</h1>
                <h1 class="w-10">${order.id}</h1>
              </div>
              <div class="relative">
                <img
                  class="h-24 w-24 max-w-full rounded-lg object-cover"
                  src="${order.pic}"
                  alt=""
                />
              </div>

              <div class="relative flex flex-1 flex-col justify-between w-full">
                <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                  <div class="pr-8 sm:pr-5">
                    <p class="text-base font-semibold text-gray-900">
                    ${order.name}
                    </p>
                    <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">
                      Category: ${order.category}
                    </p>
                    <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">
                      Quantiy: ${order.quantity}
                    </p>
                  </div>

                  <div
                    class="mt-4 flex flex-col items-end justify-between sm:mt-0 sm:items-start sm:justify-end"
                  >
                    <p
                      class="shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right"
                    >
                      Total: Rs ${order.totalAmount}
                    </p>
                    <p
                      class="shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right"
                    >
                      Sub Total: Rs ${order.subtotal}
                    </p>
                    <p
                      class="shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-left"
                    >
                      Purchased At: ${order.createdAt}
                    </p>${
                      userRole > 1
                        ? `<button  data-id= "${order.name}" data-dialog-target="sign-in-dialog" class="btn shrink-0 text-base px-4 py-1 bg-gray-900  text-white sm:order-2 sm:ml-8 sm:text-left">Rate</button>`
                        : ` <p
                      class="shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-left"
                    >
                      Purchased By: ${order.user}
                    </p>`
                    }
                  
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
`;
};

export default OrderView;
