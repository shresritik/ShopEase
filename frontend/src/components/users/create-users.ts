import { register } from "../../utils/userApi.ts";
import { createElement } from "../../utils/createElement.ts";
import { dispatch } from "../../utils/dispatch.ts";
import { fetchHtml } from "../../utils/fetchHtml.ts";

export const render = () => {
  const container = createElement("div", {
    className: "flex justify-center items-center h-screen",
  });

  const form = createElement("form", {
    className: "bg-white p-6 rounded shadow-md w-full mt-8 mb-2 w-80 sm:w-96 ",
  });
  const datas = fetchHtml("register");
  datas.then((res) => {
    form.innerHTML = res;

    const name = form.querySelector("#name") as HTMLInputElement;
    const email = form.querySelector("#email") as HTMLInputElement;
    const password = form.querySelector("#password") as HTMLInputElement;
    const confirmPassword = form.querySelector(
      "#confirmPassword"
    ) as HTMLInputElement;
    const fileInput = form.querySelector("#file-upload") as HTMLInputElement;

    const inputs = [name, email, password, confirmPassword];
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        if (password.value !== confirmPassword.value) {
          throw new Error("Passwords do not match");
        }

        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("email", email.value);
        formData.append("password", password.value);
        formData.append("roleId", "3"); // Assuming roleId is a fixed value for this form

        if (fileInput?.files?.[0]) {
          formData.append("profile-pic", fileInput.files[0]);
        }
        await register(formData);
        dispatch("/dashboard");
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
      });
    });
  });
  container.appendChild(form);
  return container;
};
