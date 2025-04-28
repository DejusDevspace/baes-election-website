import express from "express";
import {
  getAllCandidates,
  getAllPositions,
} from "../controllers/candidateController.js";

const router = express.Router();

router.get("/", getAllCandidates);
router.get("/positions", getAllPositions);

export default router;
