import express from "express";
import {
  getAllCandidates,
  getPositions,
  getCandidatesByPosition,
  getSenateCandidatesForStudent,
} from "../controllers/candidateController.js";

const router = express.Router();

router.get("/", getAllCandidates);
router.get("/positions", getPositions);
router.get("/positions/:position", getCandidatesByPosition);
router.get(
  "/positions/senate/:position/:department/:level",
  getSenateCandidatesForStudent
);

export default router;
