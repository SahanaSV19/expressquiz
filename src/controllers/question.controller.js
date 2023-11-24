import db from "../models/index.js";

export async function getAllQuestions(req, res, next) {
  try {
    const dataArray = await db.question.findAll();
    const questionsArray = dataArray.map((data) => data.dataValues);
    res.status(200).send(questionsArray);
  } catch (err) {
    next(err);
  }
}
export async function getQuestionByQuizId(req, res, next) {

}
export async function getQuestionById(req, res, next) {
    
}
export async function addQuestion(req, res, next) {}
export async function updateQuestionById(req, res, next) {}
export async function deleteQuestionById(req, res, next) {}
