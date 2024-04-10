import sqlite3 from "sqlite3";

export default class MemoAccessor {
  constructor() {
    this.db = new sqlite3.Database("./db/memo.sqlite3");
  }

  createTable() {
    return new Promise((resolve, reject) => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL)",
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

  async insert(title, content) {
    await this.createTable();
    return await new Promise((resolve, reject) => {
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

  async selectAll() {
    await this.createTable();
    return await new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos ORDER BY id", (err, memos) => {
        if (!err) {
          resolve(memos);
        } else {
          reject(err);
        }
      });
    });
  }

  select(id) {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT * FROM memos WHERE id = ?", [id], (err, memo) => {
        if (!err) {
          resolve(memo);
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
