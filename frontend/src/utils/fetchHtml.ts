import axios from "axios";

export const fetchHtml = async (path: string) => {
  try {
    const res = await axios.get(`./src/assets/html/${path}.html`);
    return res.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
