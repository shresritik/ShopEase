import { getCategories, getProductsByCategories } from "../../utils/productApi";

export const getProductsArray = async () => {
  const categorizedProducts: any = {};
  try {
    const categories = await getCategories();
    for (const category of categories) {
      const categoryName = category.category_name;
      const products = await getProductsByCategories(categoryName, "4");
      categorizedProducts[categoryName] = products;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }

  return categorizedProducts;
};
