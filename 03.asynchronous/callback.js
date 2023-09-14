import sqlite3 from 'sqlite3';

function notificationProcessResult(createTable) {
  createTable();
  console.log('booksテーブルを作成しました。');
}

notificationProcessResult(function() {
  const db = new sqlite3.Database(':memory:');
  db.run("CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)");
});
