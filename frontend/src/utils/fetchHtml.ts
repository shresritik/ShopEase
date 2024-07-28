import axios from "axios";

export const fetchHtml = async (path: string) => {
  try {
    const res = await axios.get(`./src/assets/html/${path}.html`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new Error(error.response?.data.error);
  }
};
