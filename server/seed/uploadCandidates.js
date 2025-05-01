import fs from "fs/promises";
import path from "path";
import db from "../config/db.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const candidatesPath = path.join(__dirname, "candidates.json");

try {
  const data = await fs.readFile(candidatesPath, "utf-8");
  const { candidates } = JSON.parse(data);

  for (const candidate of candidates) {
    const { name, department, level, position, image } = candidate;

    await db.query(
      `
      INSERT INTO candidates (name, department, level, position, image)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [name, department, level, position, image]
    );
  }

  console.log("✅ Candidates inserted successfully.");
} catch (err) {
  console.error("Error inserting candidates:", err);
} finally {
  await db.end();
}
