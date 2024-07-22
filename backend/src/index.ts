import express, { Request, Response } from "express";
import config from "./config";
import router from "./routes";
import { genericErrorHandler, notFound } from "./middleware/errorHandler";
import cors from "cors";
import helmet from "helmet";
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(notFound);
app.use(genericErrorHandler);
app.get("/", (req: Request, res: Response) => {
  console.log("first");
  res.json("Hello World");
});
app.listen(config.port, () => {
  console.log(`Server is listening at port ${config.port}`);
});
