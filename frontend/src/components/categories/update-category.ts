import { AxiosError } from "axios";
import { getCategories, updateCategory } from "../../api/categoriesApi";
import { createElement } from "../../utils/createElement";
import { toast } from "../../utils/toast";
import { CreateCategoryView } from "./CreateCategoryView";
const populateDropdown = (
  container: HTMLSelectElement,
  options: { id: number; categoryName: string }[]
) => {
  options.forEach((option: { id: number; categoryName: string }) => {
    const opt = document.createElement("option");
    opt.value = option.id.toString();
    opt.text = option.categoryName;
    container.appendChild(opt);
  });
};
// update the category
export const render = async () => {
  const container = createElement("div", {
    className: "flex justify-center items-center",
  });
  container.innerHTML += CreateCategoryView(true);
  const input = container.querySelector("#category") as HTMLInputElement;

  const cateogries = await getCategories();
  const dropdown = container.querySelector(
    "#email-dropdown"
  ) as HTMLSelectElement;
  container.querySelector(".select")?.classList.toggle("hidden");

  populateDropdown(dropdown, cateogries);
  let selectedCategoryId = "1";
  let selectedOption: HTMLOptionElement | null = null;
  dropdown.addEventListener("change", (event) => {
    const target = event.target as HTMLSelectElement;
    selectedCategoryId = target.value;
    selectedOption = target.selectedOptions[0];
  });
  container
    .querySelector("#categoryBtn")!
    .addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        if (input.value.length == 0)
          toast("Input field cannot be empty", "danger");
        else {
          const update = await updateCategory(+selectedCategoryId, {
            categoryName: input.value,
          });
          if (update && update.status == 200) {
            toast("Successfully Updated", "");
            selectedOption!.textContent = input.value;
          } else {
            toast("Something went wrong", "danger");
          }
        }
      } catch (error) {
        if (error instanceof AxiosError)
          toast(error.response?.data.error, "danger");
      }
    });
  return container;
};
