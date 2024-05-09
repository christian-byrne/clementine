import { sql } from "@vercel/postgres";

export default async function getAchievements(req, res) {
  const achievementIdArray = req.query.achievementIdArray
    .split(",")
    .map((achievementId) => achievementId.trim())
    .map((achievementId) => parseInt(achievementId));

  if (!achievementIdArray) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const result = await sql`
      SELECT *
      FROM achievements
      WHERE id = ANY(${achievementIdArray})
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No achievements found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting achievements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
