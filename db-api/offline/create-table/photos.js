import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const result =
      await sql`CREATE TABLE photos ( creator VARCHAR(255), dateCreated VARCHAR(255), downloads INTEGER, favorites INTEGER, imageFileName VARCHAR(255), imagePath VARCHAR(255), likes INTEGER, stylistDirName VARCHAR(255), stylistPath VARCHAR(255), stylistTitle VARCHAR(255), shared INTEGER, views INTEGER, stylistTitleSystemName VARCHAR(255), size INTEGER, humanReadableSize VARCHAR(255), fullPath VARCHAR(255), extension VARCHAR(255), filename VARCHAR(255), parentDirname VARCHAR(255), parentDirpath VARCHAR(255), lastModified INTEGER, lastAccessed INTEGER, lastUpdated INTEGER, id INTEGER PRIMARY KEY, creatorId INTEGER );`
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
