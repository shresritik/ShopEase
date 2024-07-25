import { fetchUserProfile, update } from "../utils/userApi.ts";
import { createElement } from "../utils/createElement.ts";
import { fetchHtml } from "../utils/fetchHtml.ts";

export const render = async () => {
  const container = createElement("div", {
    className: "flex justify-center items-center",
  });

  const form = createElement("form", {
    className: "bg-white p-6 rounded shadow-md w-full mt-8 mb-2 w-80 sm:w-96 ",
  });

  try {
    const user = await fetchUserProfile();
    const res = await fetchHtml("update");
    form.innerHTML = res;

    const name = form.querySelector("#name") as HTMLInputElement;
    name.value = user.name;
    const email = form.querySelector("#email") as HTMLInputElement;
    email.value = user.email;
    const password = form.querySelector("#password") as HTMLInputElement;
    const confirmPassword = form.querySelector(
      "#confirmPassword"
    ) as HTMLInputElement;
    const img = form.querySelector("img");
    img!.src =
      "http://localhost:8000/static/profile/1721749177172-revision.jpg";
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
        if (updateRes.status == 200) {
          const successElement = form.querySelector(".success") as HTMLElement;
          successElement.classList.remove("hidden");
        }
      } catch (error) {
        const errorElement = form.querySelector(".error") as HTMLElement;
        errorElement.textContent = `${error}`;
        errorElement.classList.remove("hidden");
      }
    });
    // TODO Admin level update
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const errorElement = form.querySelector(".error") as HTMLElement;
        errorElement.classList.add("hidden");
        const successElement = form.querySelector(".success") as HTMLElement;
        successElement.classList.add("hidden");
      });
    });
  } catch (error) {
    console.error("Error rendering user update form:", error);
    // Handle error appropriately, e.g., display an error message
  }

  container.appendChild(form);
  return container;
};
