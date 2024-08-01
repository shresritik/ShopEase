import { Order } from "@prisma/client";
import { createSignature } from "../service/auth";

export const generateFormForPayment = (order: Order) => {
  console.log(order);
  const signature = createSignature(
    `total_amount=${order.totalAmount},transaction_uuid=${order.id},product_code=EPAYTEST`
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
    transaction_uuid: order.id,
  };
  return formData;
};
