import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    
      await sql`CREATE TABLE badges ( id INTEGER PRIMARY KEY, src VARCHAR(255), alt VARCHAR(255), title VARCHAR(255), description TEXT, tags TEXT[], prerequisites TEXT[], tier INTEGER );`;

      await sql`CREATE TABLE achievements ( id INTEGER PRIMARY KEY, src VARCHAR(255), alt VARCHAR(255), title VARCHAR(255), description TEXT, tags TEXT[], prerequisites TEXT[], tier INTEGER, availability TEXT );`;

      const result = await sql`CREATE TABLE social_icons ( id INTEGER PRIMARY KEY, url VARCHAR(255), alt VARCHAR(255), title VARCHAR(255), companyName TEXT, color TEXT );`;
      
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
