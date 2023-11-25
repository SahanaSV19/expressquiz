import { sequelize } from "../../index.js";
import db from "../models/index.js";

export async function getAllQuestions(req, res, next) {
  try {
    const dataArray = await db.question.findAll();
    const questionsArray = dataArray.map((data) => data.dataValues);
    res.status(200).json(questionsArray);
  } catch (err) {
    next(err);
  }
}

export async function getQuestionsByQuizId(req, res, next) {
  try {
    const dataArray = await db.quiz.findOne({
      where: { id: req.params.quizId },
      include: [db.question],
    });
    res.status(200).json(dataArray);
  } catch (err) {
    next(err);
  }
}

export async function getQuestionsByQuizIdWithChoices(req, res, next) {
  try {
    console.log(req.params.id);
    const dataArray = await db.quiz.findOne({
      where: { id: req.params.id },
      include: [{ model: db.question, include: [db.choice] }],
    });
    res.status(200).json(dataArray);
  } catch (err) {
    next(err);
  }
}
export async function getQuestionById(req, res, next) {}
export async function addQuestion(req, res, next) {}
export async function updateQuestionById(req, res, next) {}
export async function deleteQuestionById(req, res, next) {}
