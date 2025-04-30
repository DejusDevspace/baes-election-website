import db from "../config/db.js";

export const castVote = async (req, res) => {
  const { voteData, studentId } = req.body;

  try {
    // Start a transaction
    await db.query("BEGIN");

    // Check if the student has already voted
    const checkVote = await db.query("SELECT * FROM votes WHERE voter = $1", [
      studentId,
    ]);

    if (checkVote.rows.length > 0) {
      return res.status(400).json({ error: "User has already voted!" });
    }

    // Insert user votes into the votes table
    for (const position in voteData) {
      const candidateId = voteData[position];

      // Insert into votes table
      await db.query(
        "INSERT INTO votes (voter, candidate_id) VALUES ($1, $2)",
        [studentId, candidateId]
      );

      // Increment the vote count for the candidate
      await db.query(
        "UPDATE candidates SET votes_count = votes_count + 1 WHERE id = $1",
        [candidateId]
      );
    }

    // Commit transaction
    await db.query("COMMIT");

    res.status(201).json({ message: "Votes submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Vote failed" });
  }
};
