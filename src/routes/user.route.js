import express from "express";

import {
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

import {
  isAdmin,
  isUser,
  verifyToken,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/** Admin  */
/**Get all users */
router.get("/allusers", [verifyToken, isAdmin], getAllUsers);

/**Admin get user */
router.get("/get/:id", [verifyToken, isAdmin], getUser);

/**User */
/**get user details */
router.get("/:id", [verifyToken, isUser], getUser);

/**update user */
router.put("/:id", [verifyToken, isUser], updateUser);

export default router;
