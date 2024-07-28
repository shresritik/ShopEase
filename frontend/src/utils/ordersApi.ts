import axios from "axios";
import { BASE_URL } from "../constants";
import { getToken } from "./auth";
import { IFormCheckout } from "../interface/checkout";
const token = getToken("accessToken");
export async function createOrders(data: IFormCheckout) {
  try {
    return await axios.post(BASE_URL + "/api/orders", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw new Error(
      error.response.data.error
        ? error.response.data.error
        : error.response.data.message
    );
  }
}
