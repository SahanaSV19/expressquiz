import express from "express";
import {
  isAdmin,
  isUser,
  verifyToken,
} from "../middlewares/auth.middleware.js";
import {
  getResultsByUserId,
  getAllResultsByUserId,
} from "../controllers/result.controller.js";

const router = express.Router();

router.post("/:quizId", verifyToken, getResultsByUserId);
router.get("/getAllResults/:userId", verifyToken, getAllResultsByUserId);

export default router;
