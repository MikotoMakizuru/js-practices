import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function createTable() {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      () => {
        resolve();
      }
    );
  });
}

function insertRecord() {
  return new Promise((resolve, reject) => {
    const title = db.prepare(
      "INSERT INTO books (title) VALUES (?)",
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
    // コールバック同様for文で書こうと思いましたが、5件出力できないので断念。
    title.run("本のタイトル");
  });
}

function outputTitleDisplay() {
  return new Promise((resolve, reject) => {
    const getDataSql = "SELECT * FROM books";
    db.each(getDataSql, function (error, row) {
      if (error) {
        reject(error);
      } else {
        console.log(`${row.id} ${row.title}`);
      }
      resolve();
    });
  });
}

function deleteTable() {
  return new Promise((resolve) => {
    db.run("DROP TABLE books", () => {
      resolve();
    });
  });
}

createTable()
  .then(() => insertRecord())
  .then(() => outputTitleDisplay())
  .then(() => deleteTable());
