import { IProduct } from "../../interface/product";
import { createElement } from "../../utils/createElement";
import { CardWrapper } from "../card/CardWrapper";

interface ProductsResponse {
  [key: string]: IProduct | { page: number; size: number; total: number };
  meta: { page: number; size: number; total: number };
}

interface RenderProductsParams {
  products: ProductsResponse | { message: string };
  productList: HTMLElement;
}

export const renderProducts = ({
  products,
  productList,
}: RenderProductsParams): void => {
  productList.innerHTML = "";
  if ("message" in products && products.message === "Product is empty") {
    productList.innerHTML = "<div>Product is empty</div>";
  } else if ("meta" in products) {
    const productArray = Object.entries(products)
      .filter(([key, value]) => key !== "meta" && typeof value === "object")
      .map(([_, product]) => product as IProduct);

    if (productArray.length === 0) {
      productList.innerHTML =
        "<div>No products found matching your criteria.</div>";
    } else {
      productArray.forEach((prod: IProduct) => {
        const productElement = CardWrapper(prod);
        productList.appendChild(productElement);
      });
      //   let paginationInfo = page.querySelector(".pagination-info");
      //   if (!paginationInfo) {
      //     paginationInfo = createElement("div", { className: "pagination-info" });
      //     page.appendChild(paginationInfo);
      //   }
      //   const meta = products.meta;
      //   paginationInfo.textContent = `Page ${meta.page} of ${Math.ceil(
      //     meta.total / meta.size
      //   )}`;
    }
  } else {
    console.error("Invalid products data:", products);
    productList.innerHTML =
      "<div>An error occurred while loading products.</div>";
  }
};
