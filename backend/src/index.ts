import express, { Request, Response } from "express";
import config from "./config";
import router from "./routes";
import { genericErrorHandler, notFound } from "./middleware/errorHandler";
import cors from "cors";
import helmet from "helmet";
import swaggerDocs from "./utils/swagger";
import path from "path";
const app = express();
//only allowing localhost:5173 to use backend
const allowedOrigins = ["http://localhost:5173"];
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not Allowed"));
      }
    },
  })
);
app.use(express.json());
app.use("/api", router);
swaggerDocs(app, +config.port!);
app.use("/static", express.static(path.basename(__dirname + "../uploads")));
app.use(notFound);
app.use(genericErrorHandler);

app.listen(config.port, () => {
  console.log(`Server is listening at port ${config.port}`);
});
