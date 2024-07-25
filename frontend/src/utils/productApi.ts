import axios from "axios";
import { BASE_URL } from "../constants";
import { getToken } from "./auth";

const token = getToken();
export async function createProduct(data: FormData) {
  try {
    return await axios.post(BASE_URL + "/api/products", data, {
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
export async function updateProduct(id: number, data: FormData) {
  try {
    return await axios.put(BASE_URL + "/api/products/" + id, data, {
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

export async function getCategories() {
  try {
    const res = await axios.get(BASE_URL + "/api/products/categories");
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
}
export async function getProductsByCategories(
  category: string,
  size: string = "4"
) {
  try {
    const res = await axios.get(
      BASE_URL + "/api/products/" + category + `?size=${size}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
}
export async function getProductByName(name: string) {
  try {
    const res = await axios.post(BASE_URL + "/api/products/me", {
      product_name: name,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
}
export async function getAllProducts() {
  try {
    const res = await axios.get(BASE_URL + "/api/products");
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
}
export async function deleteProduct(id: number) {
  try {
    const res = await axios.delete(BASE_URL + "/api/products/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
}
