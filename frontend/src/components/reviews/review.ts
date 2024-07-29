import { createElement } from "../../utils/createElement";
import { fetchHtml } from "../../utils/fetchHtml";

export const render = async () => {
  const container = createElement("div", {
    className: "flex ",
  });
  container.innerHTML += await fetchHtml("review-model");
  return container;
};
