import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function promiseRun(sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this);
      }
    });
  });
}

function promiseAll(sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

export { promiseRun, promiseAll };
