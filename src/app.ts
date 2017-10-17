import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import * as logger from "morgan";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as http from "http";
import * as winston from "winston";
import * as cors from "cors";

import * as index from "./routes/index";
import * as questions from "./routes/questions";

import config from "./config";

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const cnf = config(process.env.NODE_ENV);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

(<any>mongoose).Promise = Promise;
mongoose.connect(cnf.mongoConfig.url, { useMongoClient: true });

if (!isProduction) {
  mongoose.set("debug", true);
}

app.use("/", index);
app.use("/questions", questions);

app.use((req, res, next) => {
  const err: { status?: number; message: string } = new Error("Not Found");
  res.status(404);
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app);

server.listen(cnf.appConfig.port || 8000);
winston.info(
  `[${process.env.NODE_ENV}] Listening on port ${cnf.appConfig.port}`
);
