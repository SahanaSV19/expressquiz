import express from "express";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import {
  addQuestion,
  deleteQuestionById,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
getQuestionByQuizId
} from "../controllers/question.controller.js";

const router = express.Router();

router.get("/getallquestions", verifyToken, getAllQuestions);
router.get("/:quizId/:questionId", verifyToken, getQuestionByQuizId);
router.get("/:id", verifyToken, getQuestionById);
router.post("/", [verifyToken, isAdmin], addQuestion);
router.put("/:id", [verifyToken, isAdmin], updateQuestionById);
router.delete("/:id", [verifyToken, isAdmin], deleteQuestionById);

export default router;
