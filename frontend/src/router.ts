import { isAuthenticated } from "./utils/auth.ts";
const authenticate = (dest: string, fallback: string) => {
  if (!isAuthenticated()) {
    window.history.pushState(null, "", `/${fallback}`);
    return import(`./pages/${fallback}.ts`); // Redirect to login page
  }
  return import(`./pages/${dest}.ts`);
};
// router.ts
const routes: { [key: string]: () => Promise<any> } = {
  "/": async () => await import("./pages/login.ts"),
  "/login": async () => await authenticate("dashboard", "login"),
  "/register": async () => await import("./pages/register.ts"),
  "/dashboard": async () => await authenticate("dashboard", "login"),
  //   if (!isAuthenticated()) {
  //     window.history.pushState(null, "", "/login");
  //     return import("./pages/login.ts"); // Redirect to login page
  //   }
  //   return import("./pages/dashboard.ts");
};

export const router = () => {
  const app = document.getElementById("app") as HTMLElement;

  const navigate = async (path: string) => {
    try {
      const route = routes[path] || routes["/"];
      if (!route) {
        console.error(`Route not found for path: ${path}`);
        return;
      }
      const view = await route();
      app.innerHTML = "";
      app.appendChild(view.render());
    } catch (error) {
      console.error(`Failed to navigate to ${path}:`, error);
    }
  };

  window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    navigate(path);
  });

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLAnchorElement;
    if (target.matches("[data-link]")) {
      e.preventDefault();
      console.log("Navigating to", target.href);
      const path = new URL(target.href).pathname;
      window.history.pushState(null, "", path);
      navigate(path);
    }
  });

  // Handle initial page load
  navigate(window.location.pathname);
};
