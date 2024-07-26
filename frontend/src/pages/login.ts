// import { store } from "../store.ts";
import { fetchUserProfile, login } from "../utils/userApi.ts";
import { createElement } from "../utils/createElement.ts";
import { dispatch } from "../utils/dispatch.ts";
import { fetchHtml } from "../utils/fetchHtml.ts";
import { userProfileStore } from "../store.ts";

export const render = () => {
  const container = createElement("div", {
    className: "flex justify-center items-center h-screen",
  });

  const form = createElement("form", {
    className: "bg-white p-6 rounded shadow-md w-full mt-8 mb-2 w-80 sm:w-96 ",
  });
  const datas = fetchHtml("login");

  datas.then((res) => {
    form.innerHTML = res;

    const email = form.querySelector("#email") as HTMLInputElement;
    const password = form.querySelector("#password") as HTMLInputElement;

    const inputs = [email, password];

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        await login(email.value, password.value);
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
  });
  container.appendChild(form);
  return container;
};
