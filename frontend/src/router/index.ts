import { navbarRender } from "../components/header/header.ts";
import { navigate } from "./utils.ts";
//navigate to different location based on the path
export const router = () => {
  const app = document.getElementById("app") as HTMLElement;
  window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    navigate(path, app);
  });
  //prevent reloading on anchor tags
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLAnchorElement;
    if (target.matches("[data-link]")) {
      e.preventDefault();
      const path = new URL(target.href).pathname;
      window.history.pushState(null, "", path);
      navigate(path, app);
    }
  });

  navigate(window.location.pathname, app);
};
navbarRender();
