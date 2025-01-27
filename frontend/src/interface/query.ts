export interface IQuery {
  name?: string;
  category?: string;
  price?: string;
  rating?: string;
  size?: string;
  search?: string;
  page?: string;
}
export interface FilterState {
  categoryId: string;
  price: string;
  rating: string;
  search: string;
}
