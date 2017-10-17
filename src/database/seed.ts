import * as mongoose from "mongoose";
import * as winston from "winston";

import questionModel from "../models/Question";
const questions = require("./questions.json");
import config from "../config";

const cnf = config(process.env.NODE_ENV);
winston.info(
  `Attempting to connect to Mongo Database @ ${cnf.mongoConfig.url}`
);

(<any>mongoose).Promise = Promise;
mongoose.connect(cnf.mongoConfig.url, { useMongoClient: true }).catch(err => {
  winston.error("Failed to connect to the database", err.message);
  process.exit(0);
});

const conn = mongoose.connection;

conn
  .on("error", err => {
    winston.error("Error connecting to MongoDB", err.message);
  })
  .on("connected", () => {
    winston.info("Connected to MongoDB");
  })
  .on("disconnected", () => {
    winston.info("Disconnected from MongoDB");
  })
  .on("SIGINT", () => {
    mongoose.connection.close(() => {
      winston.info(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });

const questionCollection = mongoose.connection.collection("questions");

Promise.all([questionCollection.drop()]).then(() => {
  const records = questions.map((question, i) => {
    return { id: i, body: question };
  });

  const questionsInsert = questionModel.create(records).then(
    res => {
      winston.info(`Question records saved: ${res.length}`);
      process.exit(0);
    },
    err => winston.error(err.message)
  );
});
