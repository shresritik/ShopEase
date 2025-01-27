import { fetchUserProfile, login } from "../api/userApi.ts";
import { createElement } from "../utils/createElement.ts";
import { dispatch } from "../utils/dispatch.ts";
import { userProfileStore } from "../store.ts";
import { LoginView } from "../components/dashboard-view/LoginView.ts";
//login page
export const render = () => {
  const container = createElement("div", {
    className: "flex justify-center items-center h-[90vh] p-10",
  });

  const form = createElement("form", {
    className:
      "bg-white p-6 rounded shadow-md w-full mt-8 mb-2 w-1/2 md:w-1/3 ",
  });
  form.innerHTML = LoginView();
  const email = form.querySelector("#email") as HTMLInputElement;
  const password = form.querySelector("#password") as HTMLInputElement;
  const inputs = [email, password];
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await login(email.value, password.value);
      //after login store it in userProfile
      const profile = await fetchUserProfile();
      userProfileStore.dispatch({ type: "STORE", payload: profile });
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
  container.appendChild(form);
  return container;
};
