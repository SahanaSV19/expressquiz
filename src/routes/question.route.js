import express from "express";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import {
  deleteQuestionById,
  updateQuestionById,
  getQuestionById,
  addQuestionWithChoices,
  addQuestion,
} from "../controllers/question.controller.js";

const router = express.Router();

router.get("/:quizId/:questionId", verifyToken, getQuestionById);
router.post("/:quizId", [verifyToken, isAdmin], addQuestion);
router.post(
  "/questionwithchoices/:quizId",
  [verifyToken, isAdmin],
  addQuestionWithChoices
);
router.put("/:quizId/:questionId", [verifyToken, isAdmin], updateQuestionById);
router.delete(
  "/:quizId/:questionId",
  [verifyToken, isAdmin],
  deleteQuestionById
);

export default router;
