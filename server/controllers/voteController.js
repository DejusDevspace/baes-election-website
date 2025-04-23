import db from "../config/db.js";

// Cast vote
export const castVote = async (req, res) => {
  const { voterId, candidateId } = req.body;

  try {
    // Check if student has already voted for that position
    const positionRes = await db.query(
      "SELECT position FROM candidates WHERE id = $1",
      [candidateId]
    );
    const position = positionRes.rows[0]?.position;

    const votedRes = await db.query(
      `SELECT v.id FROM votes v
       JOIN candidates c ON v.candidate_id = c.id
       WHERE v.voter = $1 AND c.position = $2`,
      [voterId, position]
    );

    if (votedRes.rows.length > 0) {
      return res.status(400).json({ error: `Already voted for ${position}` });
    }

    // Cast vote
    await db.query("INSERT INTO votes (voter, candidate_id) VALUES ($1, $2)", [
      voterId,
      candidateId,
    ]);

    // Increment vote count
    await db.query(
      "UPDATE candidates SET votes_count = votes_count + 1 WHERE id = $1",
      [candidateId]
    );

    res.json({ message: "Vote cast successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Vote failed" });
  }
};
