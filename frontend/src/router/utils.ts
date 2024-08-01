import { routes } from "../constants";
import { RouteDefinition } from "../interface/route";
import { dispatch } from "../utils/dispatch";

export const matchRoute = (
  path: string,
  routes: RouteDefinition[]
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
export const navigate = async (path: string, app: HTMLElement) => {
  try {
    const match = matchRoute(path, routes);
    if (!match) {
      console.error(`Route not found for path: ${path}`);
      dispatch("not-found");
      return;
    }

    const { route, params } = match;
    const view = await route.load();
    app.innerHTML = "";
    app.appendChild(await view.render(params));
  } catch (error) {
    console.error(`Failed to navigate to ${path}:`, error);
  }
};
