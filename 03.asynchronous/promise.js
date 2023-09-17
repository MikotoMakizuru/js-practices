import sqlite3 from "sqlite3";

var db = new sqlite3.Database(":memory:");

function main(db) {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
    );

    setTimeout(() => {
      var title = db.prepare("INSERT INTO books(title) VALUES (?)");
      for (let i = 0; i < 5; i++) {
        title.run("タイトル" + i);
      }
      title.finalize();
      resolve();
    }, 100);

    setTimeout(() => {
      db.each("SELECT * FROM books", (err, row) => {
        console.log(`${row.id} ${row.title}`);
      });
      resolve();
    }, 200);

    setTimeout(() => {
      db.close();
    }, 300);
  });
}

main(db);
