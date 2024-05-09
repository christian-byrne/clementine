import { sql } from "@vercel/postgres";

export default async function getUserField(req, res) {
  const fieldName = req.query.fieldName;
  const userId = req.query.userId;

  if (!fieldName || !userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await sql`
      SELECT ${fieldName}
      FROM users
      WHERE id = ${userId}
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error getting user field:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
