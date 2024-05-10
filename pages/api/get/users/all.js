import { sql } from "@vercel/postgres";

export default async function getAllUsers(req, res) {
  let sqlCmd = "SELECT * FROM users";
  try {
    let result = await sql`SELECT * FROM users`;
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "No users found",
        sqlCmd: sqlCmd,
      });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({
      error: `${error.source} Error: ${error.name}`,
      errorMsg: error.message,
      errorStack: error.stack,
      sqlCmd: sqlCmd,
    });
  }
}
