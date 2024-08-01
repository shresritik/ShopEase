import { isAuthenticated } from "../utils/auth";
// authentication middleware
export const authenticate = (dest: string, fallback: string) => {
  if (!isAuthenticated()) {
    window.history.pushState(null, "", `/${fallback}`);
    return import(`../pages/${fallback}.ts`);
  }
  window.history.pushState(null, "", `/${dest}`);
  return import(`../pages/${dest}.ts`);
};
