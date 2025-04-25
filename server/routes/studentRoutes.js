import express from "express";
import {
  loginStudent,
  getCurrentStudent,
  getStudentVotes,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/auth/login", loginStudent);
router.get("/auth/me", getCurrentStudent);
router.get("/my-votes", getStudentVotes);

export default router;
