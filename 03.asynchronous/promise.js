import { promiseRun, promiseAll } from "./db-operation.js";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

promiseRun(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() =>
    promiseRun(
      db,
      "INSERT INTO books (title) VALUES (?)",
      "JavaScript Primer 迷わないための入門"
    )
  )
  .then((book) => {
    console.log(`ID: ${book.lastID}`);
  })
  .then(() => promiseAll(db, "SELECT * FROM books"))
  .then((rows) => {
    rows.forEach((row) => console.log(`${row.id} ${row.title}`));
  })
  .then(() => promiseRun(db, "DROP TABLE books"));
