import { sql } from "@vercel/postgres";

export default async function getSocialMediaIcons(req, res) {
  const socialMediaIconIdArray = req.query.socialIconIdArray
    .split(",")
    .map((iconId) => iconId.trim())
    .map((iconId) => parseInt(iconId));

  if (!socialMediaIconIdArray) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const result = await sql`
      SELECT *
      FROM social_icons
      WHERE id = ANY(${socialMediaIconIdArray})
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No social icons found" });
    }

    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting social icons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
