import axios from "axios";
import { BASE_URL } from "../constants";
import { IQuery } from "../interface/query";
import { getToken } from "../utils/auth";
import { toast } from "../utils/toast";

export async function createProduct(data: FormData) {
  const token = getToken("accessToken");

  try {
    return await axios.post(BASE_URL + "/api/products", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.error, "danger");
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
}
export async function updateProduct(id: number, data: FormData) {
  const token = getToken("accessToken");

  try {
    return await axios.put(BASE_URL + "/api/products/" + id, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.error, "danger");
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
}

export async function getProductsByCategories(
  category: string,
  query?: IQuery
) {
  try {
    const queryParams = new URLSearchParams();
    if (query && query.size) {
      queryParams.append("size", query.size);
    }
    if (query && query.name) {
      queryParams.append("search", query.name);
    }

    const res = await axios.get(
      BASE_URL + "/api/products/" + category + `?${queryParams}`
    );

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.error, "danger");
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
}
export async function getProductDetails(category: string, id: string) {
  try {
    const res = await axios.get(BASE_URL + `/api/products/${category}/${id}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.error, "danger");
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
}
export async function getProductByName(name: string) {
  try {
    const res = await axios.post(BASE_URL + "/api/products/me", {
      productName: name,
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.error, "danger");
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
}
export async function getAllProducts(query?: IQuery) {
  try {
    const queryValue = new URLSearchParams();
    if (query && query!.category)
      queryValue.append("category", query!.category);
    if (query && query!.name) queryValue.append("search", query!.name);
    if (query && query!.rating) queryValue.append("rating", query!.rating);
    if (query && query!.price) queryValue.append("price", query!.price);
    const res = await axios.get(BASE_URL + "/api/products" + `?${queryValue}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.error, "danger");
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
}
export async function deleteProduct(id: number) {
  const token = getToken("accessToken");

  try {
    const res = await axios.delete(BASE_URL + "/api/products/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.error, "danger");
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
}
