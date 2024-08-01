import { Order } from "@prisma/client";
import { createSignature } from "../service/auth";

function generateString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const generateFormForPayment = (order: Order) => {
  const randomString = generateString(5);
  const signature = createSignature(
    `total_amount=${order.totalAmount},transaction_uuid=${order.id}$${randomString},product_code=EPAYTEST`
  );
  const formData = {
    amount: order.totalAmount,
    failure_url: "http://localhost:5173/success",
    product_delivery_charge: "0",
    product_service_charge: "0",
    product_code: "EPAYTEST",
    signature: signature,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: "http://localhost:5173/success",
    tax_amount: "0",
    total_amount: order.totalAmount,
    transaction_uuid: order.id + `$` + randomString,
  };
  return formData;
};
