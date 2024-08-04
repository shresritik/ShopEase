import { createElement } from "./createElement";
import spinner from "../assets/svg/loader.svg";

export const showLoader = (container: HTMLElement): HTMLElement => {
  const loader = createElement("img", {
    className: "loader absolute top-32  w-16 left-1/2",
    src: spinner,
  });
  container.appendChild(loader);
  return loader;
};
export const removeLoader = (container: HTMLElement, loader: HTMLElement) => {
  container.removeChild(loader);
};
