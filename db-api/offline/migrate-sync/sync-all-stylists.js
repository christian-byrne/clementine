import { db } from "@vercel/postgres";
import stylistsJsonData from "@/data/stylists/all.json";

export default async function syncStylists(req, res) {
  const client = await db.connect();

  try {
    for (const recordJson of stylistsJsonData) {
      // Check if record exists
      const existingRecord =
        await client.sql`SELECT * FROM stylists WHERE id = ${recordJson.id}`;
      if (existingRecord.rows.length > 0) {
        continue;
      }

      // await sql`CREATE TABLE stylists ( badges TEXT[], bounties JSONB, creator VARCHAR(255), imageSrc VARCHAR(255), likes INTEGER, rating NUMERIC, requirements TEXT[], tags TEXT[], title VARCHAR(255), titleSystemName VARCHAR(255), size INTEGER, humanReadableSize VARCHAR(255), fullPath VARCHAR(255), extension VARCHAR(255), filename VARCHAR(255), parentDirname VARCHAR(255), parentDirpath VARCHAR(255), lastModified INTEGER, lastAccessed INTEGER, lastUpdated INTEGER, photoCount INTEGER, favorites INTEGER, downloads INTEGER, shared INTEGER, views INTEGER, dateCreated VARCHAR(255), communityUnlock JSONB, description TEXT, id INTEGER PRIMARY KEY );`;

      await client.sql`INSERT INTO stylists (id, badges, bounties, creator, imageSrc, likes, rating, requirements, tags, title, titleSystemName, size, humanReadableSize, fullPath, extension, filename, parentDirname, parentDirpath, lastModified, lastAccessed, lastUpdated, photoCount, favorites, downloads, shared, views, dateCreated, communityUnlock, description) VALUES (${
        recordJson.id
      }, ${recordJson.badges}, ${JSON.stringify(recordJson.bounties)}, ${
        recordJson.creator
      }, ${recordJson.imageSrc}, ${recordJson.likes}, ${recordJson.rating}, ${
        recordJson.requirements
      }, ${recordJson.tags}, ${recordJson.title}, ${
        recordJson.titleSystemName
      }, ${recordJson.size}, ${recordJson.humanReadableSize}, ${
        recordJson.fullPath
      }, ${recordJson.extension}, ${recordJson.filename}, ${
        recordJson.parentDirname
      }, ${recordJson.parentDirpath}, ${recordJson.lastModified}, ${
        recordJson.lastAccessed
      }, ${recordJson.lastUpdated}, ${recordJson.photoCount}, ${
        recordJson.favorites
      }, ${recordJson.downloads}, ${recordJson.shared}, ${recordJson.views}, ${
        recordJson.dateCreated
      }, ${JSON.stringify(recordJson.communityUnlock)}, ${
        recordJson.description
      })`;
    }
    res
      .status(200)
      .json({ message: "All stylists records on disk are present in DB" });
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
}
