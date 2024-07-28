import { createElement } from "../utils/createElement";
import { successEsewa } from "../utils/paymentApi";

export const render = async () => {
  const container = createElement("div", {
    className: "flex justify-center items-center h-screen",
  });
  const search = new URLSearchParams(window.location.search);
  const query = search.get("data");
  const val = await successEsewa(query!);
  console.log(val);
  if (val.data.status == "COMPLETE") {
    container.innerHTML = "Order complete success";
  } else {
    container.innerHTML = "Order failed";
  }
  return container;
};
