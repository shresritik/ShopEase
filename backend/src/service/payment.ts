import { BadRequest } from "../error";
import { createSignature } from "./auth";

export const paymentResponse = async (data: string) => {
  let buff = await Buffer.from(data, "base64");
  const decodedData = JSON.parse(buff.toString("utf-8"));

  if (decodedData.status !== "COMPLETE") {
    throw new BadRequest("Incomplete");
  }
  const message = decodedData.signed_field_names
    .split(",")
    .map((field: string) => `${field}=${decodedData[field] || ""}`)
    .join(",");
  const signature = createSignature(message);

  if (signature !== decodedData.signature) {
    throw new BadRequest("integrity error");
  }
  return decodedData;
};
