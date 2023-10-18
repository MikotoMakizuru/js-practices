import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function createTble() {
  db.run(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
}
