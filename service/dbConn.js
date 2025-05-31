const sqlite3 = require("sqlite3").verbose();

const dbPath = "./data.db";

async function executeFunction(query) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Error connecting to SQLite:", err.message);
        return reject(err);
      }
    });

    try {
      const sqLiteQuery = JSON.parse(query);

      console.log("Executing parameterized query");

      db.run("PRAGMA foreign_keys = ON", (err) => {
        if (err) return console.error("Failed to enable foreign keys", err);
      });

      db.all(sqLiteQuery.query, sqLiteQuery.values || [], (error, rows) => {
        if (error) {
          console.log("Error executing query", error);
          return reject(error);
        }
        console.log("Query Results:", rows);
        return resolve(rows);
      });

      //
    } catch (error) {
      console.log("ExecuteFunction Error:", error);
      reject(error);
    } finally {
      db.close(async (err) => {
        if (err) {
          console.error("Error closing SQLite DB:", err.message);
        }
      });
    }
  });
}

module.exports = { executeFunction };
