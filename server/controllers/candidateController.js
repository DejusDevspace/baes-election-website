import db from "../config/db.js";

// GET all candidates
export const getAllCandidates = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM candidates");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
};

export const getCandidatesByPosition = async (req, res) => {
  const { position } = req.params;
  console.log(position);
  try {
    const result = await db.query(
      "SELECT * FROM candidates WHERE position = $1",
      [position]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
};

export const getPositions = async (req, res) => {
  try {
    const result = await db.query("SELECT DISTINCT position FROM candidates;");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
};

export const getSenateCandidatesForStudent = async (req, res) => {
  const { position, level, department } = req.params;

  console.log(req.params);

  try {
    const result = await db.query(
      "SELECT * FROM candidates WHERE candidates.position = $1 and candidates.department = $2 and candidates.level = $3",
      [position, department, level]
    );
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
};
