import { IProduct } from "../../interface/product";
import { createElement } from "../../utils/createElement";
import { CardWrapper } from "../card/CardWrapper";

export const renderProducts = (
  products: any,
  productList: any,
  divSection: any,
  page: any,
  container: any,
  filter: boolean = false
) => {
  productList.innerHTML = "";
  if (products.message == "Product is empty") {
    page.innerHTML = "";
    divSection.innerHTML += "Product is empty";
  } else {
    const productArray = Object.values(products).filter(
      (item) => !item.hasOwnProperty("size")
    );
    productArray.forEach((prod: IProduct) => {
      const productElement = CardWrapper(prod);
      productList.appendChild(productElement);
      divSection.appendChild(page);
    });
  }
  page.appendChild(productList);
  container.appendChild(divSection);
};
