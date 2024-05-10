import { sql } from "@vercel/postgres";

export default async function getSortedNStylists(req, res) {
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
      sqlCmd = `SELECT * FROM stylists ORDER BY ${sortField} ${sortOrder} LIMIT ${count}`;

      // Cannot send field names as template literal args with the sql function
      if (sortOrder.toUpperCase() === "ASC") {
        if (sortField === "rating") {
          result =
            await sql`SELECT * FROM stylists ORDER BY rating ASC LIMIT ${count}`;
        } else if (
          sortField === "title" ||
          sortField === "stylistTitle" ||
          sortField === "name"
        ) {
          result =
            await sql`SELECT * FROM stylists ORDER BY title ASC LIMIT ${count}`;
        } else if (sortField === "views") {
          result =
            await sql`SELECT * FROM stylists ORDER BY views ASC LIMIT ${count}`;
        } else if (sortField === "likes") {
          result =
            await sql`SELECT * FROM stylists ORDER BY likes ASC LIMIT ${count}`;
        } else if (sortField === "dateCreated" || sortField === "datecreated") {
          result =
            await sql`SELECT * FROM stylists ORDER BY datecreated ASC LIMIT ${count}`;
        } else if (sortField === "favorites") {
          result =
            await sql`SELECT * FROM stylists ORDER BY favorites ASC LIMIT ${count}`;
        } else {
          result = await sql`SELECT * FROM stylists LIMIT ${count}`;
        }
      } else if (sortOrder.toUpperCase() === "DESC") {
        if (sortField === "rating") {
          result =
            await sql`SELECT * FROM stylists ORDER BY rating DESC LIMIT ${count}`;
        } else if (
          sortField === "title" ||
          sortField === "stylistTitle" ||
          sortField === "name"
        ) {
          result =
            await sql`SELECT * FROM stylists ORDER BY title DESC LIMIT ${count}`;
        } else if (sortField === "views") {
          result =
            await sql`SELECT * FROM stylists ORDER BY views DESC LIMIT ${count}`;
        } else if (sortField === "likes") {
          result =
            await sql`SELECT * FROM stylists ORDER BY likes DESC LIMIT ${count}`;
        } else if (sortField === "dateCreated") {
          result =
            await sql`SELECT * FROM stylists ORDER BY datecreated DESC LIMIT ${count}`;
        } else if (sortField === "favorites") {
          result =
            await sql`SELECT * FROM stylists ORDER BY favorites DESC LIMIT ${count}`;
        } else {
          result = await sql`SELECT * FROM stylists LIMIT ${count}`;
        }
      }
    } else {
      sqlCmd = `SELECT * FROM stylists LIMIT ${count}`;
      result = await sql`SELECT * FROM stylists LIMIT ${count}`;
    }

    console.log("sqlCmd:", sqlCmd);
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "No stylists found",
        sqlCmd: sqlCmd,
      });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting and sorting stylists:", error);
    res.status(500).json({
      error: `${error.source} Error: ${error.name}`,
      errorMsg: error.message,
      errorStack: error.stack,
      sqlCmd: sqlCmd,
    });
  }
}
