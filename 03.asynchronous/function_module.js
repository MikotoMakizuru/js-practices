import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function promiseRun(sql, bookTitle) {
  return new Promise((resolve, reject) => {
    db.run(sql, bookTitle, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

function promiseAll(sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, function (error, rows) {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

export { promiseRun, promiseAll };
