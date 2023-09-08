import timers from "timers/promises";
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database(':book');

db.run("CREATE TABLE IF NOT EXISTS books (id integer primary key autoincrement, title text not null unique)");
await timers.setTimeout(100);
const title = db.prepare("INSERT INTO books(title) VALUES (?)");
for (let i = 0; i < 5; i++) {
  title.run("タイトル" + i);
}
title.finalize();
await timers.setTimeout(100);
db.each("SELECT * FROM books", (row) => {
  console.log(`${row.id} ${row.title}`);
});

db.close();
