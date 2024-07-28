import { NotFound } from "../error";
import { IProduct } from "../interface/product";
import { IQuery } from "../interface/utils";
import * as ProductModel from "../model/product";
export const getProducts = async (query: IQuery) => {
  const products = await ProductModel.getAllProducts(query);
  return products;
};
export const getCategories = async () => {
  const products = await ProductModel.getAllCategories();
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
    pic: `http://localhost:8000/static/products/${product.pic}`,
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
    pic: product.pic
      ? `http://localhost:8000/static/products/${product.pic}`
      : "http://localhost:8000/static/products/default-product-image.png",
  });
  return products;
};
export const getAProductByCategoryAndId = async (
  category: string,
  id: number,
  query: IQuery
) => {
  const prodId = await ProductModel.getProductById(id);
  const prodCat = await ProductModel.getProductsByCategory(category, query);
  console.log(prodId, prodCat);
  if (!prodId && !prodCat)
    throw new NotFound(
      `Not Product found with id ${id} and category ${category}`
    );
  return await ProductModel.getProductByCategoryAndId(category, id);
};
export const getProductCategory = async (category: string, query: IQuery) => {
  const cat = await ProductModel.getProductsByCategory(category, query);
  if (cat.length == 0 || !cat)
    throw new NotFound(`Category ${category} not found`);
  return cat;
};
export const getAProduct = async (name: string) => {
  const prod = await ProductModel.getProductByName(name);
  if (!prod) throw new NotFound(`Product ${name} not found`);
  return prod;
};
