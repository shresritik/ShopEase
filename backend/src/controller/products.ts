import { Request, Response } from "express";

export const getAllProducts = (req: Request, res: Response) => {
  res.json("get all Products");
};
