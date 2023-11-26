import sqlite3 from "sqlite3";
import { promiseRun, promiseAll } from "./db-operation.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  await promiseRun(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
  try {
    await promiseRun(
      db,
      "INSERT INTO book (title) VALUES (?)",
      "JavaScript Primer 迷わないための入門"
    );
  } catch (error) {
    console.error("追加", error.message);
  }
  try {
    await promiseAll(db, "SELECT * FROM booka");
  } catch (error) {
    console.error("取得", error.message);
  }
  await promiseRun(db, "DROP TABLE books");
}

main();
