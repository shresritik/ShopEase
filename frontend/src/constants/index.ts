import { RouteDefinition } from "../interface/route.ts";
import { authenticate } from "../router/auth.ts";

export const routes: RouteDefinition[] = [
  { path: "/", load: () => import("../pages/homepage.ts") },
  { path: "/products", load: () => import("../pages/products.ts") },
  { path: "/login", load: () => authenticate("dashboard", "login") },
  { path: "/register", load: () => authenticate("dashboard", "register") },
  {
    path: "/products/:category/:id",
    load: () => import("../pages/product-details.ts"),
  },
  {
    path: "/products/:category",
    load: () => import("../pages/products.ts"),
  },
  {
    path: "/dashboard",
    load: async () => await authenticate("dashboard", "login"),
    auth: true,
  },
];
export const BASE_URL = "http://localhost:8000";
