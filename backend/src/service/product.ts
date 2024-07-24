import { NotFound } from "../error";
import { IProduct } from "../interface/product";
import * as ProductModel from "../model/product";
export const getProducts = async () => {
  const products = await ProductModel.getAllProducts();
  return products;
};
export const getAProductById = async (id: number) => {
  const products = await ProductModel.getProductById(id);
  return products;
};
export const deleteAProducts = async (id: number) => {
  const product = await ProductModel.getProductById(id);
  if (!product) throw new NotFound("No product found with the id " + id);

  await ProductModel.deleteProduct(id);
  return { message: "Product deleted" };
};
export const createAProduct = async (userId: number, product: IProduct) => {
  const products = await ProductModel.createProduct(userId, {
    ...product,
    pic: `http:localhost:8000/static/product/${product.pic}`,
  });
  return products;
};
export const updateAProduct = async (
  id: number,
  userId: number,
  product: IProduct
) => {
  const prod = await ProductModel.getProductById(id);
  if (!prod) throw new NotFound("No product found with the id " + id);
  const products = await ProductModel.updateProduct(id, userId, {
    ...product,
    pic: `http:localhost:8000/static/product/${product.pic}`,
  });
  return products;
};
export const getAProductByCategoryAndId = async (
  category: string,
  id: number
) => {
  const prodId = await ProductModel.getProductById(id);
  const prodCat = await ProductModel.getProductsByCategory(category);
  console.log(prodId, prodCat);
  if (!prodId && !prodCat)
    throw new NotFound(
      `Not Product found with id ${id} and category ${category}`
    );
  return await ProductModel.getProductByCategoryAndId(category, id);
};
export const getProductCategory = async (category: string) => {
  return await ProductModel.getProductsByCategory(category);
};
