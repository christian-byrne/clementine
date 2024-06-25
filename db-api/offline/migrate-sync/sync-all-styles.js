import { db } from "@vercel/postgres";
import stylesJsonData from "@/data/styles/styles.json";

export default async function syncStyles(req, res) {
  const client = await db.connect();

  // await sql`CREATE TABLE styles ( title VARCHAR(255), subject TEXT[], hair TEXT[], materialsAndPatterns TEXT[], fullbody TEXT[], tops TEXT[], outerwear TEXT[], bottoms TEXT[], artist TEXT[], headwear TEXT[], footwear TEXT[], jewelry TEXT[], accessories TEXT[], eyewear TEXT[], makeup TEXT[], fit TEXT[], colors TEXT[], themes TEXT[], setting TEXT[], loras TEXT[], medium TEXT[], images JSONB, id INTEGER PRIMARY KEY );`

  try {
    for (const recordJson of stylesJsonData) {
      // Check if record exists
      const existingRecord =
        await client.sql`SELECT * FROM styles WHERE id = ${recordJson.id}`;
      if (existingRecord.rows.length > 0) {
        continue;
      }

      await client.sql`INSERT INTO styles (id, title, subject, hair, materialsAndPatterns, fullbody, tops, outerwear, bottoms, artist, headwear, footwear, jewelry, accessories, eyewear, makeup, fit, colors, themes, setting, loras, medium, images) VALUES (${
        recordJson.id
      }, ${recordJson.title}, ${recordJson.subject}, ${recordJson.hair}, ${
        recordJson.materialsAndPatterns
      }, ${recordJson.fullbody}, ${recordJson.tops}, ${recordJson.outerwear}, ${
        recordJson.bottoms
      }, ${recordJson.artist}, ${recordJson.headwear}, ${
        recordJson.footwear
      }, ${recordJson.jewelry}, ${recordJson.accessories}, ${
        recordJson.eyewear
      }, ${recordJson.makeup}, ${recordJson.fit}, ${recordJson.colors}, ${
        recordJson.themes
      }, ${recordJson.setting}, ${recordJson.loras}, ${
        recordJson.medium
      }, ${JSON.stringify(recordJson.images)})`;
    }
    res.status(200).json({ message: "All style records on disk are present in DB" });
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
}
