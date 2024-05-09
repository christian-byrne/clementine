import { db } from "@vercel/postgres";
import photosJsonData from "@/data/photos/all.json";

export default async function syncPhotos(req, res) {
  const client = await db.connect();

  try {
    for (const recordJson of photosJsonData) {
      // Check if record exists
      const existingRecord =
        await client.sql`SELECT * FROM photos WHERE id = ${recordJson.id}`;
      if (existingRecord.rows.length > 0) {
        continue;
      }

      //       await sql`CREATE TABLE photos ( creator VARCHAR(255), dateCreated VARCHAR(255), downloads INTEGER, favorites INTEGER, imageFileName VARCHAR(255), imagePath VARCHAR(255), likes INTEGER, stylistDirName VARCHAR(255), stylistPath VARCHAR(255), stylistTitle VARCHAR(255), shared INTEGER, views INTEGER, stylistTitleSystemName VARCHAR(255), size INTEGER, humanReadableSize VARCHAR(255), fullPath VARCHAR(255), extension VARCHAR(255), filename VARCHAR(255), parentDirname VARCHAR(255), parentDirpath VARCHAR(255), lastModified INTEGER, lastAccessed INTEGER, lastUpdated INTEGER, id INTEGER PRIMARY KEY, creatorId INTEGER );`

      await client.sql`INSERT INTO photos (creator, dateCreated, downloads, favorites, imageFileName, imagePath, likes, stylistDirName, stylistPath, stylistTitle, shared, views, stylistTitleSystemName, size, humanReadableSize, fullPath, extension, filename, parentDirname, parentDirpath, lastModified, lastAccessed, lastUpdated, id, creatorId) VALUES (${recordJson.creator}, ${recordJson.dateCreated}, ${recordJson.downloads}, ${recordJson.favorites}, ${recordJson.imageFileName}, ${recordJson.imagePath}, ${recordJson.likes}, ${recordJson.stylistDirName}, ${recordJson.stylistPath}, ${recordJson.stylistTitle}, ${recordJson.shared}, ${recordJson.views}, ${recordJson.stylistTitleSystemName}, ${recordJson.size}, ${recordJson.humanReadableSize}, ${recordJson.fullPath}, ${recordJson.extension}, ${recordJson.filename}, ${recordJson.parentDirname}, ${recordJson.parentDirpath}, ${recordJson.lastModified}, ${recordJson.lastAccessed}, ${recordJson.lastUpdated}, ${recordJson.id}, ${recordJson.creatorId})`;
    }
    res
      .status(200)
      .json({ message: "All photos records on disk are present in DB" });
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
}
