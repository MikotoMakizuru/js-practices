import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      "JavaScript Primer 迷わないための入門",
      function () {
        console.log(`ID: ${this.lastID}`);
        db.all("SELECT * FROM books", (_error, rows) => {
          rows.forEach((row) => console.log(`${row.id} ${row.title}`));
          db.run("DROP TABLE books");
        });
      }
    );
  }
);
