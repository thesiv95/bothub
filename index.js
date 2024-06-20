import assert from "assert";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./config.js";
import routes from "./routes/index.js";
import sequelize from "./db.js";
import { StatusCodesEnum } from "./consts.js";

Object.keys(config).forEach((element) => {
  assert.ok(element, "Please check your config");
});

const { EXPRESS_PORT } = config;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/books", routes.booksRouter);
app.use("/users", routes.userRouter);
app.use("*", (_req, res) =>
  res.status(StatusCodesEnum.notFound).send({ error: "Page not found" })
);

sequelize
  .sync()
  .then(() => console.log("[DB]: tables refreshed or initialized"));

app.listen(EXPRESS_PORT, () =>
  console.log(`[app]: started on ${EXPRESS_PORT}`)
);
