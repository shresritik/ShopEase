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
  } catch (error: unknown) {
    if (axios.isAxiosError(error))
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
  }
}
export async function getOrdersByUsers(data: number) {
  try {
    console.log(data);
    const orders = await axios.get(BASE_URL + "/api/orders/" + data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (orders.status == 200) {
      return orders.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error))
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
  }
}
export async function getAllOrders() {
  try {
    const orders = await axios.get(BASE_URL + "/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (orders.status == 200) {
      return orders.data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error))
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
  }
}