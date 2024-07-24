import { register } from "../utils/userApi.ts";
import { createElement } from "../utils/createElement.ts";
import { dispatch } from "../utils/dispatch.ts";
import { fetchHtml } from "../utils/fetchHtml.ts";

export const render = (forUsers = true) => {
  const container = createElement("div", {
    className: "flex justify-center items-center h-screen",
  });

  const form = createElement("form", {
    className: "bg-white p-6 rounded shadow-md w-full mt-8 mb-2 w-80 sm:w-96 ",
  });
  let datas;
  if (forUsers) datas = fetchHtml("register");
  else datas = fetchHtml("create-users");

  datas.then((res) => {
    form.innerHTML = res;

    const name = form.querySelector("#name") as HTMLInputElement;
    const email = form.querySelector("#email") as HTMLInputElement;
    const password = form.querySelector("#password") as HTMLInputElement;
    let userRoleSelect: HTMLSelectElement;
    if (!forUsers) {
      userRoleSelect = document.getElementById(
        "user-role"
      ) as HTMLSelectElement;
      // Add an event listener for the change event
    }
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
        if (!forUsers && userRoleSelect) {
          formData.append("roleId", userRoleSelect.value);
        } else formData.append("roleId", "3");

        if (fileInput?.files?.[0]) {
          formData.append("profile-pic", fileInput.files[0]);
        }
        await register(formData);
        if (!forUsers) {
          const successElement = form?.querySelector(".success") as HTMLElement;
          successElement?.classList.remove("hidden");
        } else {
          dispatch("/dashboard");
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
        const successElement = form?.querySelector(".success") as HTMLElement;
        successElement?.classList.add("hidden");
      });
    });
  });
  container.appendChild(form);
  return container;
};
