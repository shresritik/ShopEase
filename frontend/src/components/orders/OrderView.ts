import { OrderDetail, OrderProductDetail } from "../../interface/order";
import { timezone } from "../../utils";

export default function OrderView(
  orderData: OrderDetail[],
  userRoleId: number
): string {
  const order = orderData[0];
  return `
    <div class="bg-white shadow-md rounded-lg p-6 mb-6" data-order-id="${
      order.id
    }">
      <h3 class="text-xl font-semibold mb-2">Order #${order.id}</h3>
      <div class="flex justify-between mb-4">
        ${
          order.user
            ? `<p class="text-gray-600">Customer: <span class="font-medium">${order.user}</span></p>`
            : ""
        }
        <p class="text-gray-600">Created at: <span class="font-medium">${timezone(
          order.createdAt as Date
        )}</span></p>
      </div>
      <h4 class="text-lg font-semibold mb-2">Products:</h4>
      <table class="w-full mb-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2 text-left">Product</th>
            <th class="px-4 py-2 text-left">Category</th>
            <th class="px-4 py-2 text-left">Quantity</th>
            <th class="px-4 py-2 text-left">Selling Price</th>
            ${
              userRoleId == 1
                ? `<th class="px-4 py-2 text-left">Cost Price</th>`
                : ""
            }
            <th class="px-4 py-2 text-left">Net Amount</th>
            ${
              userRoleId == 3 && order.status != "pending"
                ? `<th class="px-4 py-2 text-left">Action</th>`
                : ""
            }
          </tr>
        </thead>
        <tbody>
          ${order.products
            .map(
              (product: OrderProductDetail[]) => `
            <tr>
              <td class="px-4 py-2">
                <div class="flex items-center">
                  <img src="${product[0].pic}" alt="${
                product[0].productName
              }" class="w-12 h-12 object-cover rounded-md mr-2">
                  <span>${product[0].productName}</span>
                </div>
              </td>
              <td class="px-4 py-2">${product[0].category}</td>
              <td class="px-4 py-2">${product[0].quantity}</td>
              <td class="px-4 py-2">Rs. ${product[0].sellingPrice}</td>
              ${
                userRoleId == 1
                  ? `<td class="px-4 py-2">Rs. ${product[0].costPrice!.toFixed(
                      2
                    )}</td>`
                  : ""
              }
              <td class="px-4 py-2">Rs. ${product[0].netAmount}</td>
              ${
                userRoleId == 3 && order.status != "pending"
                  ? `
                <td class="px-4 py-2">
                  <button data-review="${product[0].productName}" data-dialog-target="sign-in-dialog" class="btn bg-gray-900 text-white px-4 py-1 rounded">Rate</button>
                </td>
              `
                  : ""
              }
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      <div class="flex justify-between items-center w-full mt-4">
        <div class="flex flex-col space-y-1">
          ${
            order.discountCode
              ? `
            <div class="flex justify-between gap-2">
              <p class="text-gray-600">Discount: <span class="font-medium">${order.discountValue}</span></p>
              <p class="text-gray-600">Coupon: <span class="font-medium">${order.discountCode}</span></p>
            </div>
          `
              : ""
          }
          <p class="text-gray-600">Vat (13%): <span class="font-medium">Rs. ${
            order.vat
          }</span></p>
          <p class="text-gray-600">Total Amount: <span class="font-medium">Rs. ${
            order.totalAmount
          }</span></p>
          ${
            userRoleId >= 2
              ? ""
              : `
            <p class="text-gray-600">Profit: <span class="font-medium ${
              order.profit > 0 ? "text-green-500" : "text-red-500"
            }">Rs. ${order.profit}</span></p>
          `
          }
        </div>
        <div class="flex flex-col items-end space-y-2">
          <p class="text-base font-semibold text-gray-900">Status: ${
            order.status
          }</p>
          ${
            userRoleId > 2
              ? ""
              : `
            <p class="text-base font-semibold text-gray-900">Purchased By: ${order.user}</p>
          `
          }
          ${
            order.status == "pending" && userRoleId == 3
              ? `
            <button id="payment-data" data-pending='${JSON.stringify({
              id: order.id,
              totalAmount: order.totalAmount,
            })}' class="bg-green-500 text-white px-4 py-2 rounded">Pay via esewa</button>
          `
              : ""
          }
        </div>
      </div>
    </div>
  `;
}
