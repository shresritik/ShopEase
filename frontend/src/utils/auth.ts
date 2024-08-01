/**
 * save token in localstorage
 * @param name to save the token
 * @param token value
 */
export const saveToken = (name: string, token: string) => {
  localStorage.setItem(name, token);
};
/**
 * get token from localstorage
 * @param name to get the token
 */
export const getToken = (name: string): string | null => {
  return localStorage.getItem(name);
};
/**
 * remove token from localstorage
 * @param name to remove the token
 */
export const removeToken = (name: string) => {
  localStorage.removeItem(name);
};
//check authentication based on token
export const isAuthenticated = (): boolean => {
  return !!getToken("accessToken");
};
