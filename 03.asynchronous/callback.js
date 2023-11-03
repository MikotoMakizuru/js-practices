import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

await timers.setTimeout(100);
db.run("INSERT INTO books (title) VALUES (?)", "ゼロからわかるRuby超入門");

await timers.setTimeout(100);
db.run(
  "INSERT INTO books (title) VALUES (?)",
  "プロを目指す人のためのRuby入門",
);

await timers.setTimeout(100);
db.all("SELECT * FROM books", (error, rows) => {
  rows.forEach((row) => console.log(`${row.id} ${row.title}`));
});

await timers.setTimeout(100);
db.run("DROP TABLE books");
