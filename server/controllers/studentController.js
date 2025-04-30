import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "custom_key";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "1h";

export const loginStudent = async (req, res) => {
  const { matricNumber, pin } = req.body;

  try {
    const query = "SELECT * FROM students WHERE matric_no = $1";
    const result = await db.query(query, [matricNumber]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const student = result.rows[0];

    // const isPinValid = await bcrypt.compare(pin, student.pin);
    const isPinValid = pin == student.pin;

    if (!isPinValid) {
      return res.status(401).json({ message: "Incorrect password entered!" });
    }

    const token = jwt.sign(
      { id: student.id, matric_no: student.matric_no },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRY,
      }
    );

    res.json({
      message: "Login successful",
      token,
      student: {
        id: student.id,
        matric_no: student.matric_no,
        level: student.level,
        department: student.department,
        surname: student.surname,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCurrentStudent = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const result = await db.query(
      "SELECT id, matric_no, level, department, surname FROM students WHERE id = $1",
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error getting student:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const getUserVoted = async (req, res) => {
  const { studentId } = req.params;

  try {
    const response = await db.query(
      "SELECT * FROM votes WHERE votes.voter = $1",
      [studentId]
    );

    res.json({
      message: "Successfully checked user voting status",
      votingStatus: response.rows.length > 0,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting voting details for user" });
  }
};
