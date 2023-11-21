import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function createTable(createTableSql) {
  return new Promise((resolve) => {
    db.run(createTableSql, () => {
      resolve();
    });
  });
}

function insertRecord(insertRecordSql, booksTitle) {
  return new Promise((resolve, reject) => {
    db.run(insertRecordSql, booksTitle, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

function selectData(selectDataSql) {
  return new Promise((resolve, reject) => {
    db.get(selectDataSql, function (error, rows) {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

function deleteTable(deleteTableSql) {
  return new Promise((resolve) => {
    db.run(deleteTableSql, () => {
      resolve();
    });
  });
}

export { createTable, insertRecord, selectData, deleteTable };
