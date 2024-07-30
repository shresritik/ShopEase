import { fetchUserProfile, update } from "../../utils/userApi.ts";
import { createElement } from "../../utils/createElement.ts";
import { RegisterView } from "../dashboard-view/RegisterView.ts";
import { toast } from "../../utils/toast.ts";

export const render = async () => {
  const container = createElement("div", {
    className: "flex justify-center items-center",
  });

  const form = createElement("form", {
    className: "bg-white p-6 rounded shadow-md w-full mb-2 w-1/2 sm:w-1/3 ",
  });

  try {
    const user = await fetchUserProfile();
    const res = RegisterView(true, true);
    form.innerHTML = res;

    const name = form.querySelector("#name") as HTMLInputElement;
    name.value = user.name;
    const email = form.querySelector("#email") as HTMLInputElement;
    email.value = user.email;
    const password = form.querySelector("#password") as HTMLInputElement;
    const confirmPassword = form.querySelector(
      "#confirmPassword"
    ) as HTMLInputElement;
    const inputs = [name, email, password, confirmPassword];

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        if (password.value !== confirmPassword.value) {
          throw new Error("Passwords do not match");
        }
        const updateRes = await update(
          user.id,
          name.value,
          email.value,
          password.value,
          3
        );
        if (updateRes!.status == 200) {
          const successElement = form.querySelector(".success") as HTMLElement;
          successElement.classList.remove("hidden");
        }
      } catch (error) {
        const errorElement = form.querySelector(".error") as HTMLElement;
        errorElement.textContent = `${error}`;
        errorElement.classList.remove("hidden");
      }
    });
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const errorElement = form.querySelector(".error") as HTMLElement;
        errorElement.classList.add("hidden");
        const successElement = form.querySelector(".success") as HTMLElement;
        successElement.classList.add("hidden");
      });
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error rendering user update form:", error);
      toast(error.message, "danger");
    }
    // Handle error appropriately, e.g., display an error message
  }

  container.appendChild(form);
  return container;
};
