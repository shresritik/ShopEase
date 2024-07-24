// import { store } from "../store.ts";
import { userObj } from "../constants/user.ts";
import { fetchUserProfile, login } from "../utils/userApi.ts";
import { createElement } from "../utils/createElement.ts";
import { dispatch } from "../utils/dispatch.ts";
import { fetchHtml } from "../utils/fetchHtml.ts";

export const render = () => {
  const container = createElement("div", {
    className: "flex justify-center items-center h-screen",
  });

  const form = createElement("form", {
    className: "bg-white p-6 rounded shadow-md w-full mt-8 mb-2 w-80 sm:w-96 ",
  });
  // const addBtn = createElement(
  //   "button",
  //   {
  //     className: "add m-5",
  //   },
  //   "Add"
  // );
  // const subtractBtn = createElement(
  //   "button",
  //   {
  //     className: "subtract m-2",
  //   },
  //   "Subtract"
  // );
  // const fieldBtn = createElement("h1", {
  //   className: "subtract",
  // });
  // container.appendChild(addBtn);
  // container.appendChild(subtractBtn);
  // container.appendChild(fieldBtn);
  // const render = (state: any) => {
  //   // console.log("as", state);
  //   fieldBtn.innerHTML = state;
  // };
  // addBtn.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   store.dispatch({ type: "INCREMENT", payload: 1 });
  // });
  // store.subscribe(render);
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
        userObj.userProfile.push(profile);
        dispatch("/dashboard");
        // Redirect to dashboard or another route upon successful login
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
