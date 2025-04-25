import express from "express";
import {
  getAllCandidates,
  getPositions,
  getCandidatesByPosition,
} from "../controllers/candidateController.js";

const router = express.Router();

router.get("/", getAllCandidates);
router.get("/positions", getPositions);
router.get("/positions/:position", getCandidatesByPosition);

export default router;
