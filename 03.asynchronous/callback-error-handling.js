import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO book (title) VALUES (?)",
      "JavaScript Primer 迷わないための入門",
      (error) => {
        if (error) {
          console.error("追加", error.message);
        }
        db.all("SELECT * FROM booka", (error) => {
          if (error) {
            console.error("取得", error.message);
          }
          db.run("DROP TABLE books");
        });
      }
    );
  }
);
