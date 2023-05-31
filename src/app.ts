import "express-async-errors";
import express from "express";
import { routes } from "./routes";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middleware/error";
import cors from "cors";

AppDataSource.initialize().then(() => {
  const PORT = process.env.APP_PORT;
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  app.get("/ping", (req, res) => res.send("pong"));

  app.use(errorMiddleware);

  app.listen(PORT, () => console.log("Listening at port: " + PORT));
});
