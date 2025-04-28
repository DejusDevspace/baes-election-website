import db from "../config/db.js";

// Cast vote
export const castVote = async (req, res) => {
  const { voteData, studentId } = req.body;

  try {
    console.log("Received Data:", voteData);
    console.log("Student ID:", studentId);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Vote failed" });
  }
};
