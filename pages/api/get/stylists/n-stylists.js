import { sql } from "@vercel/postgres";

export default async function getNStylists(req, res) {
  const count = req.query.count;

  try {
    const result = await sql`
      SELECT *
      FROM stylists
      ORDER BY rating DESC
      LIMIT ${count}
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No stylists not found" });
    }

    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting and sorting stylists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
