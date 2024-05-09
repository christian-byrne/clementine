import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  // Delete Users table if it already exists
  try {
    const result = await sql`DROP TABLE IF EXISTS Users;`;
  } catch (error) {
    return response.status(500).json({ error });
  }
  // Delete users table if it already exists
  try {
    const result = await sql`DROP TABLE IF EXISTS users;`;
  }
  catch (error) {
    return response.status(500).json({ error });
  }

  return response.status(200).json({ message: "Tables deleted" });

  // try {
  //   const result =
  //     await sql`CREATE TABLE Users ( id SERIAL PRIMARY KEY, achievementCount INT, averageRating NUMERIC(3,2), badgeCount INT, badges JSONB, downloads INT, email VARCHAR(255), favorites INT, idHash VARCHAR(64), joinDate VARCHAR(255), lastActive VARCHAR(255), likes BIGINT, location VARCHAR(255), modelCount INT, name VARCHAR(255), bio JSONB, nameSystem VARCHAR(255), ownModels JSONB, phone VARCHAR(255), ranks JSONB, score BIGINT, socialIcons JSONB, statuses JSONB, titleCount INT, titles JSONB, totalRatings INT, username VARCHAR(255), views BIGINT );`;
  //   return response.status(200).json({ result });
  // } catch (error) {
  //   return response.status(500).json({ error });
  // }
}
