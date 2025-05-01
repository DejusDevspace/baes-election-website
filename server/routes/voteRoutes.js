import express from "express";
import { castVote, getResults } from "../controllers/voteController.js";

const router = express.Router();

router.post("/cast-votes", castVote);
router.get("/results", getResults);

export default router;
