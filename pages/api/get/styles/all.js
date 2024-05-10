import { sql } from "@vercel/postgres";

export default async function getAllStyles(req, res) {
  let count;
  if ("count" in req.query) {
    count = req.query.count;
  }
  else {
    count = 30;
  }

  let sqlCmd = `SELECT * FROM styles ORDER BY title ASC LIMIT ${count}`;
  try {
    let result = await sql`SELECT * FROM styles ORDER BY title ASC LIMIT ${count}`;
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "No styles found",
        sqlCmd: sqlCmd,
      });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting all styles:", error);
    res.status(500).json({
      error: `${error.source} Error: ${error.name}`,
      errorMsg: error.message,
      errorStack: error.stack,
      sqlCmd: sqlCmd,
    });
  }
}
