import { sql } from "@vercel/postgres";

export default async function getNPhotos(req, res) {
  let sqlCmd = "";
  try {
    const count = req.query.count;
    let result;

    if ("sortField" in req.query && "sortOrder" in req.query) {
      const sortField = req.query.sortField;
      const sortOrder = req.query.sortOrder;
      sqlCmd = `SELECT * FROM photos ORDER BY ${sortField} ${sortOrder} LIMIT ${count}`;

      if (sortOrder.toUpperCase() === "ASC") {
        result =
          await sql`SELECT * FROM photos ORDER BY ${sortField} ASC LIMIT ${count}`;
      } else {
        result =
          await sql`SELECT * FROM photos ORDER BY ${sortField} DESC LIMIT ${count}`;
      }
    } else {
      sqlCmd = `SELECT * FROM photos LIMIT ${count}`;
      result = await sql`SELECT * FROM photos LIMIT ${count}`;
    }
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "No photos not found",
        sqlCmd: sqlCmd,
      });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting and sorting photos:", error);
    res.status(500).json({
      error: `${error.source} Error: ${error.name}`,
      errorMsg: error.message,
      errorStack: error.stack,
      sqlCmd: sqlCmd,
    });
  }
}
