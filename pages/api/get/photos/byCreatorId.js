import { sql } from "@vercel/postgres";

export default async function getPhotosByCreatorId(req, res) {
  const creatorId = req.query.creatorId;

  // ONLY GIVE MAX 10 PHOTOS

  if (!creatorId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userStylists = await sql`
      SELECT ownmodels
      FROM users
      WHERE id = ${creatorId}
    `;
    if (userStylists.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const stylistIds = userStylists.rows[0].ownmodels;

    const stylistNames = await sql`
      SELECT titlesystemname
      FROM stylists
      WHERE id = ANY(${stylistIds})
    `;
    if (stylistNames.rows.length === 0) {
      return res.status(404).json({ error: "Stylists not found" });
    }


    const result = await sql`
      SELECT *
      FROM photos
      WHERE stylisttitlesystemname = ANY(${stylistNames.rows.map(
        (stylist) => stylist.titlesystemname
      )})`;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No Photos found by user" });
    }

    res.status(200).json(result.rows.slice(0, 10));
  } catch (error) {
    console.error("Error getting photos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
