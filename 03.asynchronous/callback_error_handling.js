import sqlite3 from "sqlite3";
import timers from "timers/promises";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

await timers.setTimeout(100);
const title = db.prepare("INSERT INTO books (title) VALUES (?)", (error) => {
  if (error) {
    console.log("レコード追加失敗");
  }
});
for (let i = 0; i < 5; i++) {
  title.run("タイトル" + i, (error) => {
    if (error) {
      console.log("レコード追加失敗");
    }
  });
}

await timers.setTimeout(100);
db.all("SELECT * FROM books", (error, rows) => {
  if (error) {
    console.log("本のタイトル表示失敗");
  }
  rows.forEach((row) => console.log(`${row.id} ${row.title}`));
});

await timers.setTimeout(100);
db.run("DROP TABLE books");
