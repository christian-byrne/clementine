import { db } from "@vercel/postgres";
import badgesJsonData from "@/data/badges/all.json";
import achievementsJsonData from "@/data/achievements/all.json";
import socialIconsJsonData from "@/data/social-icons/all.json";

export default async function syncStylists(req, res) {
  const client = await db.connect();

  try {
    for (const recordJson of badgesJsonData) {
      // Check if record exists
      const existingRecord =
        await client.sql`SELECT * FROM badges WHERE id = ${recordJson.id}`;
      if (existingRecord.rows.length > 0) {
        continue;
      }

      await client.sql`INSERT INTO badges (id, src, alt, title, tier) VALUES (${recordJson.id}, ${recordJson.src}, ${recordJson.alt}, ${recordJson.title}, ${recordJson.tier})`;
    }
    for (const recordJson of achievementsJsonData) {
      // Check if record exists
      const existingRecord =
        await client.sql`SELECT * FROM achievements WHERE id = ${recordJson.id}`;
      if (existingRecord.rows.length > 0) {
        continue;
      }

      await client.sql`INSERT INTO achievements (id, src, alt, title) VALUES (${recordJson.id}, ${recordJson.src}, ${recordJson.alt}, ${recordJson.title})`;
    }
    for (const recordJson of socialIconsJsonData) {
      // Check if record exists
      const existingRecord =
        await client.sql`SELECT * FROM social_icons WHERE id = ${recordJson.id}`;
      if (existingRecord.rows.length > 0) {
        continue;
      }

      await client.sql`INSERT INTO social_icons (id, url, alt) VALUES (${recordJson.id}, ${recordJson.url}, ${recordJson.alt})`;
    }
    res
      .status(200)
      .json({ message: "All game element (badges, achievements, social icons) records on disk are present in DB" });
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
}
