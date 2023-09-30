import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTable = () => {
  db.run(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );
};

const insertRecord = () => {
  var title = db.prepare("INSERT INTO books(title) VALUES (?)");
  for (let i = 0; i < 5; i++) {
    title.run("タイトル" + i);
  }
};

const outputDisplayTitle = () => {
  db.each("SELECT * FROM books", (error, row) => {
    console.log(`${row.id} ${row.title}`);
  });
};

const deleteTable = () => {
  db.run("DROP TABLE books");
};

createTable();
await timers.setTimeout(100);
insertRecord();
await timers.setTimeout(100);
outputDisplayTitle();
await timers.setTimeout(100);
deleteTable();
