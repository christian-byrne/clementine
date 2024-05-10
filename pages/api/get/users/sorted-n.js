import { sql } from "@vercel/postgres";

export default async function getSortedNUsers(req, res) {
  if (!req.query.count) {
    return res.status(400).json({
      error: "Missing required fields: count",
    });
  }

  const count = req.query.count;
  let sqlCmd = "";
  try {
    let result;
    if ("sortField" in req.query && "sortOrder" in req.query) {
      const sortField = req.query.sortField;
      const sortOrder = req.query.sortOrder;
      sqlCmd = `SELECT * FROM users ORDER BY ${sortField} ${sortOrder} LIMIT ${count}`;

      // Cannot send field names as template literal args with the sql function
      if (sortOrder.toUpperCase() === "ASC") {
        if (sortField === "score") {
          result =
            await sql`SELECT * FROM users ORDER BY score ASC LIMIT ${count}`;
        } else if (
          sortField === "nameSystem" ||
          sortField === "name" ||
          sortField === "namesystem"
        ) {
          result =
            await sql`SELECT * FROM users ORDER BY namesystem ASC LIMIT ${count}`;
        } else if (sortField === "awards") {
          result =
            await sql`SELECT * FROM users ORDER BY CONCAT(badgecount, achievementcount, titlecount) ASC LIMIT ${count}`;
        } else if (sortField === "likes") {
          result =
            await sql`SELECT * FROM users ORDER BY likes ASC LIMIT ${count}`;
        } else if (sortField === "joindate" || sortField === "joinDate") {
          result =
            await sql`SELECT * FROM users ORDER BY joindate ASC LIMIT ${count}`;
        } else if (sortField === "favorites") {
          result =
            await sql`SELECT * FROM users ORDER BY favorites ASC LIMIT ${count}`;
        } else if (sortField === "downloads") {
          result =
            await sql`SELECT * FROM users ORDER BY downloads ASC LIMIT ${count}`;
        } else if (sortField === "lastActive" || sortField === "lastactive") {
          result =
            await sql`SELECT * FROM users ORDER BY lastactive ASC LIMIT ${count}`;
        } else if (sortField === "modelCount" || sortField === "modelcount") {
          result =
            await sql`SELECT * FROM users ORDER BY modelcount ASC LIMIT ${count}`;
        }
        else if (sortField === "views") {
          result =
            await sql`SELECT * FROM users ORDER BY views ASC LIMIT ${count}`;
        }
        else {
          result = await sql`SELECT * FROM users LIMIT ${count}`;
        }
      } else if (sortOrder.toUpperCase() === "DESC") {
        if (sortField === "score") {
          result =
            await sql`SELECT * FROM users ORDER BY score DESC LIMIT ${count}`;
        } else if (
          sortField === "nameSystem" ||
          sortField === "name" ||
          sortField === "namesystem"
        ) {
          result =
            await sql`SELECT * FROM users ORDER BY namesystem DESC LIMIT ${count}`;
        } else if (sortField === "awards") {
          result =
            await sql`SELECT * FROM users ORDER BY CONCAT(badgecount, achievementcount, titlecount) DESC LIMIT ${count}`;
        } else if (sortField === "likes") {
          result =
            await sql`SELECT * FROM users ORDER BY likes DESC LIMIT ${count}`;
        } else if (sortField === "joindate" || sortField === "joinDate") {
          result =
            await sql`SELECT * FROM users ORDER BY joindate DESC LIMIT ${count}`;
        } else if (sortField === "favorites") {
          result =
            await sql`SELECT * FROM users ORDER BY favorites DESC LIMIT ${count}`;
        } else if (sortField === "downloads") {
          result =
            await sql`SELECT * FROM users ORDER BY downloads DESC LIMIT ${count}`;
        } else if (sortField === "lastActive" || sortField === "lastactive") {
          result =
            await sql`SELECT * FROM users ORDER BY lastactive DESC LIMIT ${count}`;
        } else if (sortField === "modelCount" || sortField === "modelcount") {
          result =
            await sql`SELECT * FROM users ORDER BY modelcount DESC LIMIT ${count}`;
        } else if (sortField === "views") {
          result =
            await sql`SELECT * FROM users ORDER BY views DESC LIMIT ${count}`;
        } else {
          result = await sql`SELECT * FROM users LIMIT ${count}`;
        }
      }
    } else {
      sqlCmd = `SELECT * FROM users LIMIT ${count}`;
      result = await sql`SELECT * FROM users LIMIT ${count}`;
    }

    console.log("sqlCmd:", sqlCmd);
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
