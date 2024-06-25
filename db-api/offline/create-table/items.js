import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const result =
      await sql`CREATE TABLE items ( id INTEGER PRIMARY KEY, name VARCHAR(255), imageSrc VARCHAR(255), systemName VARCHAR(255), extension VARCHAR(255), dateCreated VARCHAR(255), dateLastUsed VARCHAR(255), aliases TEXT[], tags TEXT[], path VARCHAR(255) )`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
