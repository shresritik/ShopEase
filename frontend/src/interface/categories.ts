import { IProduct } from "./product";

export interface ICategories {
  categoryName: string;
}
export interface CategorizedProducts {
  [category: string]: IProduct[];
}
