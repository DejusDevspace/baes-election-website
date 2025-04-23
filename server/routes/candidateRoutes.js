import express from "express";
import { getAllCandidates } from "../controllers/candidateController.js";

const router = express.Router();

// GET all candidates
router.get("/", getAllCandidates);

export default router;
