import axios from "axios";
import { BASE_URL } from "../constants";
import { ICategories } from "../interface/categories";
import { getToken } from "../utils/auth";
import { toast } from "../utils/toast";

export const createCategory = async ({ categoryName }: ICategories) => {
  const token = getToken("accessToken");
  try {
    const data = await axios.post(
      BASE_URL + "/api/categories",
      {
        categoryName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
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
};
export const updateCategory = async (
  id: number,
  { categoryName }: ICategories
) => {
  const token = getToken("accessToken");
  try {
    const data = await axios.put(
      BASE_URL + "/api/categories/" + id,
      {
        categoryName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
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
};
export const deleteCategory = async (id: number) => {
  try {
    const token = getToken("accessToken");
    const data = await axios.delete(BASE_URL + "/api/categories/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
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
};
export async function getCategories() {
  try {
    const res = await axios.get(BASE_URL + "/api/categories");
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
