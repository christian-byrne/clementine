import { sql } from "@vercel/postgres";

export default async function getBadges(req, res) {
  const badgeIdArray = req.query.badgeIdArray
    .split(",")
    .map((badgeId) => badgeId.trim())
    .map((badgeId) => parseInt(badgeId));

  if (!badgeIdArray) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const result = await sql`
      SELECT *
      FROM badges
      WHERE id = ANY(${badgeIdArray})
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No Badges found" });
    }

    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting badges:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
