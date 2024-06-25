import { db } from "@vercel/postgres";
import itemsJsonData from "@/data/items/all.json";

export default async function syncItems(req, res) {
  const client = await db.connect();

  try {
    for (const recordJson of itemsJsonData) {
      // Check if record exists
      const existingRecord =
        await client.sql`SELECT * FROM items WHERE id = ${recordJson.id}`;
      if (existingRecord.rows.length > 0) {
        continue;
      }

      // await sql`CREATE TABLE items ( id INTEGER PRIMARY KEY, name VARCHAR(255), imageSrc VARCHAR(255), systemName VARCHAR(255), extension VARCHAR(255), dateCreated VARCHAR(255), dateLastUsed VARCHAR(255), aliases TEXT[], tags TEXT[], path VARCHAR(255) )`;

      await client.sql`INSERT INTO items (id, name, imageSrc, systemName, extension, dateCreated, dateLastUsed, aliases, tags, path) VALUES (${recordJson.id}, ${recordJson.name}, ${recordJson.imageSrc}, ${recordJson.systemName}, ${recordJson.extension}, ${recordJson.dateCreated}, ${recordJson.dateLastUsed}, ${recordJson.aliases}, ${recordJson.tags}, ${recordJson.path})`;
    }
    res
      .status(200)
      .json({ message: "All items records on disk are present in DB" });
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
}
