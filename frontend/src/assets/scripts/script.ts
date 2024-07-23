import Dashboard from "./views/Dashboard.ts";
import { Login } from "./views/Login.ts";
import { NotFound } from "./views/NotFound.ts";
import PostView from "./views/PostVIew.ts";
import { Register } from "./views/Register.ts";

// const pathToRegex = (path: any) =>
//   new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// const getParams = (match: any) => {
//   const values = match.result.slice(1);
//   const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
//     (result: any) => result[1]
//   );

//   return Object.fromEntries(
//     keys.map((key, i) => {
//       return [key, values[i]];
//     })
//   );
// };

const navigateTo = (url: any) => {
  history.pushState(null, "", url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/register", view: Register },
    { path: "/posts/:id", view: PostView },
    { path: "/login", view: Login },
    { path: "/not-found", view: NotFound },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      // result: location.pathname.match(pathToRegex(route.path)),
      result: location.pathname == route.path,
    };
  });
  let match = potentialMatches.find((potentialMatch) => potentialMatch.result);

  if (!match) {
    match = {
      route: routes[routes.length - 1],
      result: true,
    };
  }

  const view = new match.route.view({ id: 1 });

  // document.querySelector("#app")!.innerHTML = await view.getHtml();
  view.render();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e: any) => {
    if (e.target!.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
