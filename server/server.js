import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./config/db.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed", err);
  } else {
    console.log("Connected to the database");
  }
});

// Middleware
app.use(
  cors({
    origin: ["https://baeselections.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route for database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM candidates;");
    res.json({
      message: "Database connected successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({ response: { message: "Hello World!" } });
});

app.use("/api/candidates", candidateRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/student", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
