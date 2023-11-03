import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function createTable(callback) {
  db.run(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    callback,
  );
}

function insertRecord(callback) {
  const title = db.prepare("INSERT INTO books (title) VALUES (?)");
  for (let i = 0; i < 5; i++) {
    title.run("タイトル" + i, (error) => {
      if (error) {
        console.log("レコード追加失敗");
      }
    });
  }
  title.finalize(callback);
}

function outputTitleDisplay() {
  const getDataSql = "SELECT * FROM books";
  db.each(getDataSql, (error, row) => {
    if (error) {
      console.log("本のタイトル表示失敗");
    } else {
      console.log(`${row.id} ${row.title}`);
    }
  });
}

function deleteTable() {
  db.run("DROP TABLE books");
}

createTable(function () {
  insertRecord(function () {
    outputTitleDisplay(function () {
      deleteTable(function () {});
    });
  });
});
