import { sql } from "@vercel/postgres";

export default async function getSortedUsers(req, res) {
  let sqlCmd = "";
  try {
    let result;
    if ("sortField" in req.query && "sortOrder" in req.query) {
      const sortField = req.query.sortField;
      const sortOrder = req.query.sortOrder;
      sqlCmd = `SELECT * FROM users ORDER BY ${sortField} ${sortOrder}`;

      // Cannot send field names as template literal args with the sql function
      if (sortOrder.toUpperCase() === "ASC") {
        if (sortField === "score") {
          result = await sql`SELECT * FROM users ORDER BY score ASC`;
        } else if (
          sortField === "nameSystem" ||
          sortField === "name" ||
          sortField === "namesystem"
        ) {
          result = await sql`SELECT * FROM users ORDER BY namesystem ASC`;
        } else if (sortField === "awards") {
          result =
            await sql`SELECT * FROM users ORDER BY CONCAT(badgecount, achievementcount, titlecount) ASC`;
        } else if (sortField === "likes") {
          result = await sql`SELECT * FROM users ORDER BY likes ASC`;
        } else if (sortField === "joindate" || sortField === "joinDate") {
          result = await sql`SELECT * FROM users ORDER BY joindate ASC`;
        } else if (sortField === "favorites") {
          result = await sql`SELECT * FROM users ORDER BY favorites ASC`;
        } else if (sortField === "downloads") {
          result = await sql`SELECT * FROM users ORDER BY downloads ASC`;
        } else if (sortField === "lastActive" || sortField === "lastactive") {
          result = await sql`SELECT * FROM users ORDER BY lastactive ASC`;
        } else if (sortField === "modelCount" || sortField === "modelcount") {
          result = await sql`SELECT * FROM users ORDER BY modelcount ASC`;
        } else if (sortField === "views") {
          result = await sql`SELECT * FROM users ORDER BY views ASC`;
        } else {
          result = await sql`SELECT * FROM users`;
        }
      } else if (sortOrder.toUpperCase() === "DESC") {
        if (sortField === "score") {
          result = await sql`SELECT * FROM users ORDER BY score DESC`;
        } else if (
          sortField === "nameSystem" ||
          sortField === "name" ||
          sortField === "namesystem"
        ) {
          result = await sql`SELECT * FROM users ORDER BY namesystem DESC`;
        } else if (sortField === "awards") {
          result =
            await sql`SELECT * FROM users ORDER BY CONCAT(badgecount, achievementcount, titlecount) DESC`;
        } else if (sortField === "likes") {
          result = await sql`SELECT * FROM users ORDER BY likes DESC`;
        } else if (sortField === "joindate" || sortField === "joinDate") {
          result = await sql`SELECT * FROM users ORDER BY joindate DESC`;
        } else if (sortField === "favorites") {
          result = await sql`SELECT * FROM users ORDER BY favorites DESC`;
        } else if (sortField === "downloads") {
          result = await sql`SELECT * FROM users ORDER BY downloads DESC`;
        } else if (sortField === "lastActive" || sortField === "lastactive") {
          result = await sql`SELECT * FROM users ORDER BY lastactive DESC`;
        } else if (sortField === "modelCount" || sortField === "modelcount") {
          result = await sql`SELECT * FROM users ORDER BY modelcount DESC`;
        } else if (sortField === "views") {
          result = await sql`SELECT * FROM users ORDER BY views DESC`;
        } else {
          result = await sql`SELECT * FROM users`;
        }
      }
    } else {
      sqlCmd = `SELECT * FROM users`;
      result = await sql`SELECT * FROM users`;
    }

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "No users found",
        sqlCmd: sqlCmd,
      });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting and sorting users:", error);
    res.status(500).json({
      error: `${error.source} Error: ${error.name}`,
      errorMsg: error.message,
      errorStack: error.stack,
      sqlCmd: sqlCmd,
    });
  }
}
