import sqlite3 from "sqlite3";

export default class Memo {
  constructor() {
    this.db = new sqlite3.Database("./DB/memo.sqlite3");
  }

  createTable() {
    return new Promise((resolve, reject) => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)",
        function (err) {
          if (!err) {
            resolve(this);
          } else {
            reject(err);
          }
        },
      );
    });
  }

  insert(title, content) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO memos (title, content) VALUES (?, ?)",
        [title, content],
        function (err) {
          if (!err) {
            resolve(this);
          } else {
            reject(err);
          }
        },
      );
    });
  }

  titleList() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT id, title FROM memos", (err, rows) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      });
    });
  }

  select(id) {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT * FROM memos WHERE id == ?", [id], (err, rows) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM memos WHERE id = ?", [id], function (err) {
        if (!err) {
          resolve(this);
        } else {
          reject(err);
        }
      });
    });
  }
}
