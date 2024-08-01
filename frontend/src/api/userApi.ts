import axios from "axios";
import { getToken, saveToken } from "../utils/auth.ts";
import { BASE_URL } from "../constants/index.ts";
import { toast } from "../utils/toast.ts";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(BASE_URL + "/api/auth/login", {
      email,
      password,
    });
    saveToken("accessToken", response.data.accessToken);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new Error(error.response?.data.error);
  }
};

export const updateUser = async (id: string, data: FormData) => {
  const token = getToken("accessToken");
  try {
    return await axios.put(BASE_URL + "/api/users/" + id, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new Error(error.response?.data.error);
  }
};
export const register = async (data: FormData): Promise<void> => {
  try {
    const token = getToken("accessToken");

    await axios.post(BASE_URL + "/api/users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new Error(error.response?.data.error);
  }
};

export const fetchUserProfile = async () => {
  const token = getToken("accessToken");
  try {
    const res = await axios.get(BASE_URL + "/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.error, "danger");
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
};
export const getUserByEmail = async (email: string) => {
  const token = getToken("accessToken");
  try {
    const res = await axios.post(
      BASE_URL + "/api/users/email",
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.error, "danger");
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
};
export const deleteUser = async (id: string) => {
  const token = getToken("accessToken");
  try {
    const res = await axios.delete(BASE_URL + `/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.error, "danger");
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
};
export const getAllUsers = async () => {
  const token = getToken("accessToken");
  try {
    const res = await axios.get(BASE_URL + `/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast(error.response?.data.error, "danger");
      throw new Error(
        error.response?.data.error
          ? error.response.data.error
          : error.response?.data.message
      );
    }
  }
};
