import { navbarRender } from "../components/utils/header.ts";
import { navigate } from "./utils.ts";
export const router = () => {
  const app = document.getElementById("app") as HTMLElement;
  window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    navigate(path, app);
  });

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLAnchorElement;
    if (target.matches("[data-link]")) {
      e.preventDefault();
      console.log("Navigating to", target.href);
      const path = new URL(target.href).pathname;
      window.history.pushState(null, "", path);
      navigate(path, app);
    }
  });

  // Handle initial page load
  navigate(window.location.pathname, app);
};
navbarRender();
