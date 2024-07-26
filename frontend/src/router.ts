import { navbarRender } from "./components/utils/header.ts";
import { isAuthenticated } from "./utils/auth.ts";

interface RouteDefinition {
  path: string;
  load: () => Promise<any>;
  auth?: boolean;
}

const authenticate = (dest: string, fallback: string) => {
  if (!isAuthenticated()) {
    window.history.pushState(null, "", `/${fallback}`);
    return import(`./pages/${fallback}.ts`);
  }
  window.history.pushState(null, "", `/${dest}`);
  return import(`./pages/${dest}.ts`);
};

const routes: RouteDefinition[] = [
  { path: "/", load: () => import("./pages/homepage.ts") },
  { path: "/products", load: () => import("./pages/products.ts") },
  { path: "/login", load: () => authenticate("dashboard", "login") },
  { path: "/register", load: () => authenticate("dashboard", "register") },
  {
    path: "/products/:category/:id",
    load: () => import("./pages/product-details.ts"),
  },
  {
    path: "/products/:category",
    load: () => import("./pages/products.ts"),
  },
  {
    path: "/dashboard",
    load: async () => await authenticate("dashboard", "login"),
    auth: true,
  },
];

export const router = () => {
  const app = document.getElementById("app") as HTMLElement;

  const matchRoute = (
    path: string
  ): { route: RouteDefinition; params: { [key: string]: string } } | null => {
    for (const route of routes) {
      const routeParts = route.path.split("/");
      const pathParts = path.split("/");
      if (routeParts.length !== pathParts.length) continue;
      const params: { [key: string]: string } = {};
      let match = true;

      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(":")) {
          params[routeParts[i].slice(1)] = pathParts[i];
        } else if (routeParts[i] !== pathParts[i]) {
          match = false;
          break;
        }
      }
      if (match) return { route, params };
    }

    return null;
  };

  const navigate = async (path: string) => {
    try {
      const match = matchRoute(path);
      if (!match) {
        console.error(`Route not found for path: ${path}`);
        return;
      }

      const { route, params } = match;

      // if (route.auth && !isAuthenticated()) {
      //   window.history.pushState(null, "", "/login");
      //   const loginView = await import("./pages/login.ts");
      //   app.innerHTML = "";
      //   app.appendChild(await loginView.render());
      //   return;
      // }

      const view = await route.load();
      app.innerHTML = "";
      app.appendChild(await view.render(params));
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
navbarRender();
