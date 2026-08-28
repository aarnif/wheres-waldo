import { Router } from "express";
import { emptyDatabase, populateDatabase } from "../db/populateDb.ts";

const router = Router();

router.post("/reset", async (_req, res) => {
  try {
    await emptyDatabase();
    await populateDatabase();
    return res.status(200).json({ message: "Database reset successfully." });
  } catch (error) {
    console.error("Error resetting the database:", error);
    return res.status(500).json({ message: "Failed to reset the database." });
  }
});

export default router;
