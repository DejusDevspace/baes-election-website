import db from "../config/db.js";

export const getAllCandidates = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM candidates");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
};

export const getAllPositions = async (req, res) => {
  try {
    const result = await db.query("SELECT DISTINCT position FROM candidates;");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
};
