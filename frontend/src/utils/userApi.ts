import axios from "axios";
import { getToken, refreshToken } from "./auth.ts";
import { BASE_URL } from "../constants/index.ts";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(BASE_URL + "/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const update = async (
  id: string,
  name: string,
  email: string,
  password: string,
  roleId: number
) => {
  const token = getToken();
  try {
    return await axios.put(
      BASE_URL + "/api/users/" + id,
      {
        name,
        email,
        password,
        roleId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};
export const register = async (data: FormData): Promise<void> => {
  try {
    const token = getToken();
    await axios.post(BASE_URL + "/api/users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, options);

    if (response.status === 401) {
      await refreshToken();
      const newToken = getToken();
      if (newToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return fetch(url, options);
      }
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
export const fetchUserProfile = async () => {
  const token = getToken();

  const res = await axios.get(BASE_URL + "/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const deleteUser = async (id: string) => {
  const token = getToken();

  const res = await axios.delete(BASE_URL + `/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getAllUsers = async () => {
  const token = getToken();

  const res = await axios.get(BASE_URL + `/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
