import { db } from "@vercel/postgres";
import usersJsonData from "@/data/users/all.json";

export default async function syncUsers(req, res) {
  const client = await db.connect();

  try {
    for (const recordJson of usersJsonData) {
      // Check if record exists
      const existingRecord =
        await client.sql`SELECT * FROM users WHERE id = ${recordJson.id}`;
      if (existingRecord.rows.length > 0) {
        continue;
      }

      await client.sql`INSERT INTO users (id, achievementCount, averageRating, badgeCount, badges, downloads, email, favorites, joinDate, lastActive, likes, location, modelCount, name, bio, nameSystem, ownModels, phone, ranks, score, socialIcons, statuses, titleCount, titles, totalRatings, username, views, achievements) VALUES (${
        recordJson.id
      }, ${recordJson.achievementCount}, ${recordJson.averageRating}, ${
        recordJson.badgeCount
      }, ${recordJson.badges}, ${recordJson.downloads}, ${recordJson.email}, ${
        recordJson.favorites
      }, ${recordJson.joinDate}, ${recordJson.lastActive}, ${
        recordJson.likes
      }, ${recordJson.location}, ${recordJson.modelCount}, ${
        recordJson.name
      }, ${JSON.stringify(recordJson.bio)}, ${recordJson.nameSystem}, ${
        recordJson.ownModels
      }, ${recordJson.phone}, ${recordJson.ranks}, ${recordJson.score}, ${
        recordJson.socialIcons
      }, ${JSON.stringify(recordJson.statuses)}, ${recordJson.titleCount}, ${
        recordJson.titles
      }, ${recordJson.totalRatings}, ${recordJson.username}, ${
        recordJson.views
      }, ${recordJson.achievements})`;
    }
    res
      .status(200)
      .json({ message: "All users records on disk are present in DB" });
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
}
