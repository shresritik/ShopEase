import config from "../config";
import { NotFound } from "../error";
import { IProduct } from "../interface/product";
import { IQuery } from "../interface/utils";
import * as ProductModel from "../model/product";
// get All products and their count
export const getProducts = async (query: IQuery) => {
  const products = await ProductModel.getAllProducts(query);
  const count = await ProductModel.count(query);

  const meta = {
    page: query.page,
    size: products.length,
    total: +count.count,
  };
  return { ...products, meta };
};
// get product by id
export const getAProductById = async (id: number) => {
  const products = await ProductModel.getProductById(id);
  return products;
};
// delete product by id
export const deleteAProducts = async (id: number) => {
  const product = await ProductModel.getProductById(id);
  if (!product) throw new NotFound("No product found with the id " + id);

  await ProductModel.deleteProduct(id);
  return { message: "Product deleted" };
};
// create a product and set default pic if not provided
export const createAProduct = async (userId: number, product: IProduct) => {
  const products = await ProductModel.createProduct(userId, {
    ...product,
    pic: product.pic
      ? `http://localhost:${config.port}/static/products/${product.pic}`
      : `http://localhost:${config.port}/static/products/default-product-image.png`,
  });
  return products;
};
// update product by id
export const updateAProduct = async (
  id: number,
  userId: number,
  product: IProduct
) => {
  const prod = await ProductModel.getProductById(id);
  if (!prod) throw new NotFound("No product found with the id " + id);
  const products = await ProductModel.updateProduct(id, userId, {
    ...product,
    pic:
      product.pic &&
      `http://localhost:${config.port}/static/products/${product.pic}`,
  });
  return products;
};
// get product by category and id
export const getAProductByCategoryAndId = async (
  category: string,
  id: number,
  query: IQuery
) => {
  const prodId = await ProductModel.getProductById(id);
  const prodCat = await ProductModel.getProductsByCategory(category, query);
  if (!prodId && !prodCat)
    throw new NotFound(
      `Not Product found with id ${id} and category ${category}`
    );
  return await ProductModel.getProductByCategoryAndId(category, id);
};
// get product by category
export const getProductCategory = async (category: string, query: IQuery) => {
  const cat = await ProductModel.getProductsByCategory(category, query);
  const count = await ProductModel.count(query);

  const meta = {
    page: query.page,
    size: cat.length,
    total: +count.count,
  };
  return { ...cat, meta };
};
// get product info by name
export const getAProduct = async (name: string) => {
  const prod = await ProductModel.getProductByName(name);

  if (!prod) throw new NotFound(`Product ${name} not found`);
  return prod;
};
