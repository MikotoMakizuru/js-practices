import timers from "timers/promises";
import sqlite3 from "sqlite3";

var db = new sqlite3.Database(":memory:");
db.run(
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
);

await timers.setTimeout(100);
var title = db.prepare("INSERT INTO books(title) VALUES (?)");
for (let i = 0; i < 5; i++) {
  title.run("タイトル" + i, function (err) {
    if (err) {
      console.log("エラーが発生しました");
    }
  });
}
title.finalize();

await timers.setTimeout(100);
db.each("SELECT * FROM books", (err, row) => {
  if (err) {
    console.log("エラーが発生しました");
  } else {
    console.log(`${row.id} ${row.title}`);
  }
});

await timers.setTimeout(100);
db.run("DROP TABLE books");
