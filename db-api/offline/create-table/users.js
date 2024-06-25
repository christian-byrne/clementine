import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const result =
      await sql`CREATE TABLE users ( achievementCount INTEGER, averageRating NUMERIC, badgeCount INTEGER, badges INTEGER[], downloads INTEGER, email VARCHAR(255), favorites INTEGER, id INTEGER PRIMARY KEY, joinDate VARCHAR(255), lastActive VARCHAR(255), likes BIGINT, location VARCHAR(255), modelCount INTEGER, name VARCHAR(255), bio JSONB, nameSystem VARCHAR(255), ownModels INTEGER[], phone VARCHAR(255), ranks TEXT[], score BIGINT, socialIcons INTEGER[], statuses JSONB, titleCount INTEGER, titles TEXT[], totalRatings INTEGER, username VARCHAR(255), views BIGINT, achievements INTEGER[] );`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
