import { NextFunction, Request, Response } from "express";
import { createSignature } from "../service/auth";
interface IRequest extends Request {
  transaction_uuid?: string;
  transaction_code?: string;
}
export const handleEsewaSuccess = async (req: IRequest, res: Response) => {
  try {
    const data = req.query.data as string;
    let buff = await Buffer.from(data, "base64");
    const decodedData = JSON.parse(buff.toString("utf-8"));
    console.log(decodedData);

    if (decodedData.status !== "COMPLETE") {
      return res.status(400).json({ message: "errror" });
    }
    const message = decodedData.signed_field_names
      .split(",")
      .map((field: any) => `${field}=${decodedData[field] || ""}`)
      .join(",");
    console.log(message);
    const signature = createSignature(message);

    if (signature !== decodedData.signature) {
      res.json({ message: "integrity error" });
    }

    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;
    return res.status(200).json(decodedData);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err || "No Orders found" });
  }
};
