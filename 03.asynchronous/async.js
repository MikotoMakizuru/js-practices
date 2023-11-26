import sqlite3 from "sqlite3";
import { promiseRun, promiseAll } from "./db-operation.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  await promiseRun(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
  const result = await promiseRun(
    db,
    "INSERT INTO books (title) VALUES (?)",
    "JavaScript Primer 迷わないための入門"
  );
  console.log(`ID: ${result.lastID}`);
  const rows = await promiseAll(db, "SELECT * FROM books");
  rows.forEach((row) => console.log(`${row.id} ${row.title}`));
  await promiseRun(db, "DROP TABLE books");
}

main();
