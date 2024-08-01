import { IProduct } from "../../interface/product";
import { IQuery } from "../../interface/query";
import { getProductsByCategories } from "../../api/productApi";
import { getCategories } from "../../api/categoriesApi";

export const getProductsArray = async (query: IQuery) => {
  const categorizedProducts: { [key: string]: IProduct[] } = {};
  try {
    const categories = await getCategories();
    for (const category of categories) {
      const categoryName = category.categoryName;
      const products = await getProductsByCategories(categoryName, query);
      console.log("prod", products);
      if (!products) {
        console.log(products);
        return;
      }
      categorizedProducts[categoryName] = products;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  return categorizedProducts;
};
