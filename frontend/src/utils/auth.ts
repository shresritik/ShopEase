export const saveToken = (name: string, token: string) => {
  localStorage.setItem(name, token);
};

export const getToken = (name: string): string | null => {
  return localStorage.getItem(name);
};

export const removeToken = (name: string) => {
  localStorage.removeItem(name);
};

export const isAuthenticated = (): boolean => {
  return !!getToken("accessToken");
};

export const refreshToken = async (): Promise<void> => {
  const refreshToken = getToken("refreshToken");

  if (!refreshToken) {
    removeToken("accessToken");
    window.history.pushState(null, "", "/login");
    return;
  }

  try {
    const response = await fetch("/api/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const { accessToken } = await response.json();
      saveToken("accessToken", accessToken);
    } else {
      removeToken("accessToken");
      window.history.pushState(null, "", "/login");
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    removeToken("accessToken");
    window.history.pushState(null, "", "/login");
  }
};
