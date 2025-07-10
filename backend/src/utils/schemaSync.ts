import { db } from "../config/db";
// import bcrypt from "bcrypt";

type Tables = { name: string; schema: string }[];

export const syncSchemas = async (tables: Tables) => {
  // await db.query("DROP TABLE IF EXISTS leave_types");
  // await db.query("DROP TABLE IF EXISTS leave_requests");
  // await db.query("DROP TABLE IF EXISTS employee");

  // const hashed = await bcrypt.hash("admin@123", 10);
  // await db.query(
  //   "INSERT INTO employee (name, email, password, role) VALUES(?, ?, ?, ?)",
  //   ["Abiram", "admin@gmail.com", hashed, "admin"]
  // );

  for (const table of tables) {
    try {
      // const [rows] = await db.query(`SELECT * FROM ${table.name}`);
      // console.log(`${table.name} Table Rows:`, rows);
      
      // await db.query(table.schema);
      // console.log(`Table synced: ${table.name}`);
    } catch (error) {
      console.error(`Failed to sync table: ${table.name}`, error);
    }
  }
};
