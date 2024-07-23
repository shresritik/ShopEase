export function dispatch(path: string) {
  window.history.pushState(null, "", path);
  window.dispatchEvent(new Event("popstate")); // Trigger routing
}
