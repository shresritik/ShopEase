import { AxiosError } from "axios";
import { createCategory } from "../../api/categoriesApi";
import { createElement } from "../../utils/createElement";
import { toast } from "../../utils/toast";
import { CreateCategoryView } from "./CreateCategoryView";
//create category logic
export const render = async () => {
  const container = createElement("div", {
    className: "flex flex-col justify-center items-center w-full",
  });
  container.innerHTML += CreateCategoryView();
  const input = container.querySelector("#category") as HTMLInputElement;
  container
    .querySelector("#categoryBtn")
    ?.addEventListener("click", async (e) => {
      e.preventDefault();
      const categoryData = { categoryName: input.value };
      try {
        const res = await createCategory(categoryData);
        if (res && res.status == 201) {
          toast("Category created Successfully", "");
        } else {
          toast("Something went wrong", "danger");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast(error.response?.data.error, "danger");
        }
      }
    });
  return container;
};
