
import { sql } from "@vercel/postgres";

export default async function getUserStylists(req, res) {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userStylists = await sql`
      SELECT ownmodels
      FROM users
      WHERE id = ${userId}
    `;

    if (userStylists.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const stylistIds = userStylists.rows[0].ownmodels;
    const result = await sql`
      SELECT *
      FROM stylists
      WHERE id = ANY(${stylistIds})
    `;  

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting user field:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
