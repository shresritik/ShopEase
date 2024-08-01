import axios from "axios";
import { BASE_URL } from "../constants";
import { ICategories } from "../interface/categories";
import { getToken } from "../utils/auth";

export const createCategory = async ({ category_name }: ICategories) => {
  const token = getToken("accessToken");
  const data = await axios.post(
    BASE_URL + "/api/categories",
    {
      category_name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
export const updateCategory = async (
  id: number,
  { category_name }: ICategories
) => {
  const token = getToken("accessToken");

  const data = await axios.put(
    BASE_URL + "/api/categories/" + id,
    {
      category_name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
export const deleteCategory = async (id: number) => {
  const token = getToken("accessToken");
  const data = await axios.delete(BASE_URL + "/api/categories/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
export async function getCategories() {
  try {
    const res = await axios.get(BASE_URL + "/api/categories");
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new Error(error.response?.data.error);
  }
}
