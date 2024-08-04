import { routes } from "../constants";
import { RouteDefinition } from "../interface/route";
import { dispatch } from "../utils/dispatch";
import { toast } from "../utils/toast";
// match route based on comparision of length by splitting on "/" and find ":" which is the params
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
// navigate to different path
export const navigate = async (path: string, app: HTMLElement) => {
  try {
    const match = matchRoute(path, routes);
    if (!match) {
      dispatch("not-found");
      return;
    }
    const { route, params } = match;
    const view = await route.load();
    app.innerHTML = "";
    app.appendChild(await view.render(params));
  } catch (error) {
    toast(`Failed to navigate to ${path}:`, "danger");
  }
};
