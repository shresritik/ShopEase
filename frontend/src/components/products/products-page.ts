import { MetaCart, RenderProductsParams } from "../../interface/product";
import { CardWrapper } from "../card/CardWrapper";
//products display page with card
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
      .map(([_, product]) => product as MetaCart);

    if (productArray.length === 0) {
      productList.innerHTML =
        "<div>No products found matching your criteria.</div>";
    } else {
      productArray.forEach((prod: MetaCart) => {
        const productElement = CardWrapper(prod);
        productList.appendChild(productElement);
      });
    }
  } else {
    productList.innerHTML =
      "<div>An error occurred while loading products.</div>";
  }
};
