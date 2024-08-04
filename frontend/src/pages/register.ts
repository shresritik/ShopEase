import { getUserByEmail, register, updateUser } from "../api/userApi.ts";
import { createElement } from "../utils/createElement.ts";
import { dispatch } from "../utils/dispatch.ts";
import { RegisterView } from "../components/dashboard-view/RegisterView.ts";
import { toast } from "../utils/toast.ts";
import { IUser } from "../interface/user.ts";
//signup page and update
export const render = (forUsers = true, update = false) => {
  const container = createElement("div", {
    className: "flex justify-center items-center md:px-6 ",
  });
  const form = createElement("form", {
    className: `bg-white p-6 rounded shadow-md w-full ${
      forUsers ? "mt-8" : ""
    }  mb-2 w-80 md:w-1/3`,
  });

  let userRoleSelect: HTMLSelectElement;
  let datas;
  if (forUsers) datas = RegisterView();
  else datas = RegisterView(!forUsers);
  form.innerHTML = datas;
  let userValue: IUser;
  if (!forUsers) {
    userRoleSelect = form.querySelector("#user-role") as HTMLSelectElement;
  }
  const name = form.querySelector("#name") as HTMLInputElement;
  const email = form.querySelector("#email") as HTMLInputElement;
  const password = form.querySelector("#password") as HTMLInputElement;
  // if update page then modify it
  if (update) {
    form.querySelector(".form")?.classList.add("hidden");
    form.querySelector(".check-email")?.classList.remove("hidden");
    const userEmail = form.querySelector("#user") as HTMLInputElement;
    form.querySelector("#checkName")?.addEventListener("click", async (e) => {
      e.preventDefault();
      userValue = await getUserByEmail(userEmail.value);
      if (userValue) {
        form.querySelector(".form")?.classList.remove("hidden");
        form.querySelector(".check-email")?.classList.add("hidden");
        name.value = userValue.name;
        email.value = userValue.email;
        userRoleSelect.value = userValue.roleId ? "" + userValue.roleId : "3";
      } else {
        toast("error", "danger");
      }
    });
  } else {
    form.querySelector(".check-email")?.classList.add("hidden");
    form.querySelector(".form")?.classList.remove("hidden");
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
      if (!forUsers || userRoleSelect) {
        formData.append("roleId", userRoleSelect.value);
      } else {
        formData.append("roleId", "3");
      }

      if (fileInput?.files?.[0]) {
        formData.append("profile-pic", fileInput.files[0]);
      }
      if (update) {
        await updateUser("" + userValue.id, formData);
      } else {
        await register(formData);
        name.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = "";
      }

      container.appendChild(form);

      if (!forUsers) {
        const successElement = form?.querySelector(".success") as HTMLElement;
        successElement?.classList.remove("hidden");
      } else {
        dispatch("/dashboard");
      }
    } catch (error) {
      console.log(error);
      const errorElement = form.querySelector(".user-error") as HTMLElement;
      errorElement.textContent = `${error}`;
      errorElement.classList.remove("hidden");
    }
  });

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const errorElement = form.querySelector(".user-error") as HTMLElement;
      console.log(document.querySelector(".user-error"));
      errorElement.classList.add("hidden");
      const successElement = form?.querySelector(".success") as HTMLElement;
      successElement?.classList.add("hidden");
    });
  });
  container.appendChild(form);
  return container;
};
