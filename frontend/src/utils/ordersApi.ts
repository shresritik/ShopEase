import axios from "axios";
import { BASE_URL } from "../constants";
import { getToken } from "./auth";
import { IFormCheckout } from "../interface/checkout";
export async function createOrders(data: IFormCheckout) {
  const token = getToken("accessToken");
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
export async function getOrdersByUsers(data: number, query?: { q: string }) {
  const token = getToken("accessToken");
  try {
    const queryParam = new URLSearchParams();
    if (query && query.q) {
      queryParam.append("q", query.q);
    }

    const orders = await axios.get(
      BASE_URL + "/api/orders/" + data + `?${queryParam}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
export async function getAllOrders(query?: { q: string }) {
  const token = getToken("accessToken");
  try {
    const queryParam = new URLSearchParams();
    if (query && query.q) {
      queryParam.append("q", query.q);
    }
    const orders = await axios.get(
      BASE_URL + "/api/orders" + `?${queryParam}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
