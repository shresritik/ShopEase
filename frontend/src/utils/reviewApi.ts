import axios from "axios";
import { BASE_URL } from "../constants";
import { getToken } from "./auth";
import { IReview } from "../interface/review";

export const createReview = async (review: IReview) => {
  const token = getToken("accessToken");
  const reviewRes = await axios.post(BASE_URL + "/api/reviews", review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (reviewRes.status != 201) {
    throw new Error("Somwthing went wrong");
  }
  return reviewRes.data;
};

export const getReview = async (prodId: number) => {
  const reviewRes = await axios.get(BASE_URL + "/api/reviews" + `/${prodId}`);
  if (reviewRes.status != 200) {
    throw new Error("Somwthing went wrong");
  }
  return reviewRes.data;
};
