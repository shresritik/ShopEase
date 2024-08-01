/**
 * Dispatch a 'popstate' event to notify the application about the URL change
 * @param path Change the current URL to the specified path without reloading the page
 */
export function dispatch(path: string) {
  window.history.pushState(null, "", path);
  window.dispatchEvent(new Event("popstate"));
}
