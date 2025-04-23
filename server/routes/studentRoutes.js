import express from "express";
import {
  loginStudent,
  getCurrentStudent,
} from "../controllers/studentController";

const router = express.Router();

router.post("/login", loginStudent);
router.get("/me", getCurrentStudent);

export default router;
