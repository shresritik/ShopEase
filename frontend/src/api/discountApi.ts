import axios from "axios";
import { BASE_URL } from "../constants";
import { IDiscount } from "../interface/discount";
import { getToken } from "../utils/auth";
import { toast } from "../utils/toast";

export async function createDiscount(data: IDiscount) {
  const token = getToken("accessToken");
  try {
    return await axios.post(BASE_URL + "/api/discount", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
}
export async function getAllDiscount() {
  const token = getToken("accessToken");

  try {
    const res = await axios.get(BASE_URL + "/api/discount", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message,
        "danger"
      );
      throw new Error(error.response?.data.error);
    }
  }
}
export async function getADiscount(code: string) {
  const token = getToken("accessToken");

  try {
    const res = await axios.get(BASE_URL + "/api/discount/" + code, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message,
        "danger"
      );
      throw new Error(error.response?.data.error);
    }
  }
}
export async function deleteDiscount(id: number) {
  const token = getToken("accessToken");

  try {
    const res = await axios.delete(BASE_URL + "/api/discount/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message,
        "danger"
      );
      throw new Error(error.response?.data.error);
    }
  }
}
export async function updateDiscount(id: number, data: IDiscount) {
  const token = getToken("accessToken");

  try {
    const res = await axios.put(BASE_URL + "/api/discount/" + id, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message,
        "danger"
      );
      throw new Error(error.response?.data.error);
    }
  }
}
