import { timezone } from "../../utils";

export default function OrderView(orderData: any, userRoleId: number): string {
  const order = orderData[0];

  return `
    <div class="bg-white shadow-md rounded-lg p-6 mb-6" data-order-id="${
      order.id
    }">
      <h3 class="text-xl font-semibold mb-2">Order #${order.id}</h3>
     <div class="flex justify-between">
     ${
       order.user
         ? `<p class="text-gray-600 mb-4">Customer: <span class="font-medium"> ${order.user}</p>`
         : ""
     }</span>
     <p class="text-gray-600 mb-4">Created at: <span class="font-medium"> ${timezone(
       order.createdAt
     )}</p>
      </div>
      <h4 class="text-lg font-semibold mb-2">Products:</h4>
      <ul class="space-y-4">
        ${order.products.map(
          (product: any) => `
          <li class="flex items-start border-b border-gray-200 pb-4">
            <img src="${product[0].pic}" alt="${
            product[0].productName
          }" class="w-16 h-16 object-cover rounded-md mr-4">
            <div class="flex-grow">
              <p class="font-medium">${
                product[0].productName
              } <span class="text-sm text-gray-500">(${
            product[0].category
          })</span>
            <p class="text-sm text-gray-600">Quantity: ${
              product[0].quantity
            }</p>
            </p>
              <p class="text-sm text-gray-600">Selling Price: Rs. ${
                product[0].selling_price
              }</p>
              ${
                userRoleId === 1
                  ? `<p class="text-sm text-gray-600">Cost Price: Rs. ${product[0].cost_price.toFixed(
                      2
                    )}</p>`
                  : ""
              }
              <p class="text-sm text-gray-600">Net Amount: Rs. ${
                product[0].net_amount
              }</p>
              
            </div>
          </li>
        `
        )}
        </ul>
        <div class="flex justify-between items-center w-full mt-4">

        <div class="flex flex-col space-y-1 ">

           <p class="text-gray-600">Vat (13%): <span class="font-medium">Rs. ${
             order.total_amount - Math.floor(order.total_amount / 1.13)
           } </span></p>
      <p class="text-gray-600">Total Amount: <span class="font-medium">Rs. ${
        order.total_amount
      } </span></p>
        ${
          userRoleId == 2
            ? ""
            : `<p class="text-gray-600">Profit: <span class="font-medium">Rs. ${order.profit} </span></p>`
        } 
 

      </div>
      ${
        userRoleId > 2
          ? `<button  data-id= "${order.name}" data-dialog-target="sign-in-dialog" class="btn shrink-0 text-base px-8  bg-gray-900  text-white sm:order-2 sm:ml-8 sm:text-left">Rate</button>`
          : ` <p
        class="shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-left"
      >
        Purchased By: ${order.user}
      </p>`
      }
     </div>
    </div>
  `;
}
