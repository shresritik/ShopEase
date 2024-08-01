import axios from "axios";
import { BASE_URL } from "../constants";
import { getToken } from "../utils/auth";
import { IReview } from "../interface/review";
import { toast } from "../utils/toast";

export const createReview = async (review: IReview) => {
  const token = getToken("accessToken");
  try {
    const reviewRes = await axios.post(BASE_URL + "/api/reviews", review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (reviewRes.status != 201) {
      throw new Error("Somwthing went wrong");
    }
    return reviewRes.data;
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

export const getReview = async (prodId: number) => {
  try {
    const reviewRes = await axios.get(BASE_URL + "/api/reviews" + `/${prodId}`);
    if (reviewRes.status != 200) {
      throw new Error("Somwthing went wrong");
    }
    return reviewRes.data;
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
