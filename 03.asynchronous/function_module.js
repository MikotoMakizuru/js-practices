import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function createTable() {
  return new Promise((resolve, reject) => {
    db.run(
      "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      },
    );
  });
}

function insertBookTitleZeroRuby() {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      "ゼロからわかるRuby超入門",
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      },
    );
  });
}

function insertBookTitleCherryBook() {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      "プロを目指す人のためのRuby入門",
      function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      },
    );
  });
}

function outputTitleDisplay() {
  return new Promise((resolve, reject) => {
    db.each("SELECT * FROM books", function (error, row) {
      if (error) {
        reject(error);
      } else {
        resolve(console.log(`${row.id} ${row.title}`));
      }
    });
  });
}

function deleteTable() {
  return new Promise((resolve, reject) => {
    db.run("DROP TABLE books", function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

export {
  createTable,
  insertBookTitleZeroRuby,
  insertBookTitleCherryBook,
  outputTitleDisplay,
  deleteTable,
};
