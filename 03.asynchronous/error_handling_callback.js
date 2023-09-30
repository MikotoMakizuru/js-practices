import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const createTable = () => {
  db.run(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
};

const insertRecord = () => {
  var title = db.prepare("INSERT INTO books(title) VALUES (?)");
  for (let i = 0; i < 5; i++) {
    title.run("タイトル" + i, (error) => {
      if (error) {
        console.log("レコード追加に失敗しました");
      }
    });
  }
};

const outputDisplayTitle = () => {
  db.each("SELECT * FROM books", (error, row) => {
    if (error) {
      console.log("本のタイトル表示に失敗しました");
    } else {
      console.log(`${row.id} ${row.title}`);
    }
  });
};

const deleteTable = () => {
  db.run("DROP TABLE books");
};

createTable();
setTimeout(function () {
  insertRecord();
  setTimeout(function () {
    outputDisplayTitle();
    setTimeout(function () {
      deleteTable();
    }, 100);
  }, 100);
}, 100);
