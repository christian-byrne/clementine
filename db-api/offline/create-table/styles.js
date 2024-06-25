import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const result =
      await sql`CREATE TABLE styles ( title VARCHAR(255), subject TEXT[], hair TEXT[], materialsAndPatterns TEXT[], fullbody TEXT[], tops TEXT[], outerwear TEXT[], bottoms TEXT[], artist TEXT[], headwear TEXT[], footwear TEXT[], jewelry TEXT[], accessories TEXT[], eyewear TEXT[], makeup TEXT[], fit TEXT[], colors TEXT[], themes TEXT[], setting TEXT[], loras TEXT[], medium TEXT[], images JSONB, id INTEGER PRIMARY KEY );`
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
