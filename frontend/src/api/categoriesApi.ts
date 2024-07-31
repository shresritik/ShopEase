import axios from "axios";
import { BASE_URL } from "../constants";
import { ICategories } from "../interface/categories";

export const createCategory = async ({ category_name }: ICategories) => {
  const data = await axios.post(BASE_URL + "/api/categories", {
    category_name,
  });
  return data;
};
export const updateCategory = async (
  id: number,
  { category_name }: ICategories
) => {
  const data = await axios.put(BASE_URL + "/api/categories/" + id, {
    category_name,
  });
  return data;
};
export const deleteCategory = async (id: number) => {
  const data = await axios.delete(BASE_URL + "/api/categories/" + id);
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
