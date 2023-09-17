import sqlite3 from "sqlite3";

function main() {
  var db = new sqlite3.Database(":memory:");
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
      db.run("DROP TABLE books");
    }, 300);
  });
}

main();
