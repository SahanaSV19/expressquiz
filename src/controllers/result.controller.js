import { sequelize } from "../../index.js";
import db from "../models/index.js";

export async function getResultsByUserId(req, res, next) {
  try {
    const quizId = req.params.quizId;
    const userId = req.user.id;
    if (req.params.id == req.user.id || req.user.id == 1) {
      const data = await sequelize.query(
        `select (select title from quizzes where id = ${quizId}) as quizTitle, (select count(*) from questions where quizid = ${quizId}) as totalQuestions, (select count(*) from answers where userchoice = correctchoice and userid = ${userId} and quizid = ${quizId}) as correctAnswers, (select username from users where id = ${userId}) as userName;`
      );

      const resultdata = { ...data[0][0], quizId, userId };
      const result = await db.result.create(resultdata);
      res.status(200).json("result added");
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllResultsByUserId(req, res, next){
  
}