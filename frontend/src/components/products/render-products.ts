import { IProduct } from "../../interface/product";
import { IQuery } from "../../interface/query";
import { getProductsByCategories } from "../../api/productApi";
import { getCategories } from "../../api/categoriesApi";
import { toast } from "../../utils/toast";
import { AxiosError } from "axios";
// get categories then products
export const getProductsArray = async (query: IQuery) => {
  const categorizedProducts: { [key: string]: IProduct[] } = {};
  try {
    const categories = await getCategories();
    for (const category of categories) {
      const categoryName = category.categoryName;
      const products = await getProductsByCategories(categoryName, query);
      if (!products) {
        return;
      }
      categorizedProducts[categoryName] = products;
    }
  } catch (error) {
    if (error instanceof AxiosError)
      toast(error.response?.data.error, "danger");
  }

  return categorizedProducts;
};
