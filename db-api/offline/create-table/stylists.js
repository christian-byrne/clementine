

import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const result =
      await sql`CREATE TABLE stylists ( badges TEXT[], bounties JSONB, creator VARCHAR(255), imageSrc VARCHAR(255), likes INTEGER, rating NUMERIC, requirements TEXT[], tags TEXT[], title VARCHAR(255), titleSystemName VARCHAR(255), size INTEGER, humanReadableSize VARCHAR(255), fullPath VARCHAR(255), extension VARCHAR(255), filename VARCHAR(255), parentDirname VARCHAR(255), parentDirpath VARCHAR(255), lastModified INTEGER, lastAccessed INTEGER, lastUpdated INTEGER, photoCount INTEGER, favorites INTEGER, downloads INTEGER, shared INTEGER, views INTEGER, dateCreated VARCHAR(255), communityUnlock JSONB, description TEXT, id INTEGER PRIMARY KEY );`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}