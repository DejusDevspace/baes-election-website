import express from "express";
import {
  loginStudent,
  getCurrentStudent,
  getUserVoted,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/auth/login", loginStudent);
router.get("/auth/me", getCurrentStudent);
router.get("/has-voted/:studentId", getUserVoted);

export default router;
