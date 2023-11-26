import express from "express";
import { isAdmin, verifyToken } from "../middlewares/auth.middleware.js";
import {
  deleteQuestionById,
  updateQuestionById,
  getQuestionById,
  addQuestionById,
} from "../controllers/question.controller.js";

const router = express.Router();

router.get("/:quizId/:questionId", verifyToken, getQuestionById);
router.post("/:quizId", [verifyToken, isAdmin], addQuestionById);
router.put("/:quizId/:questionId", [verifyToken, isAdmin], updateQuestionById);
router.delete(
  "/:quizId/:questionId",
  [verifyToken, isAdmin],
  deleteQuestionById
);

export default router;
