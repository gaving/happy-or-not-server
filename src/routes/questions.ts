import * as express from "express";
import * as mongoose from "mongoose";
import winston from "winston";

import Question from "../models/Question";

let router: express.Router = express.Router();

router.get("/", (req, res, next) => {
  Question.find()
    .select("_id id body")
    .lean()
    .exec((err, questions) => {
      if (err) {
        winston.error(err);
      } else {
        res.json(questions);
      }
    });
});

export = router;
