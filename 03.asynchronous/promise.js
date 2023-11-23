import { promiseRun, promiseAll } from "./db_operation.js";

promiseRun(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() =>
    promiseRun(
      "INSERT INTO books (title) VALUES ('JavaScript Primer 迷わないための入門')"
    )
  )
  .then((book) => {
    console.log(`ID: ${book.lastID}`);
  })
  .then(() => promiseAll("SELECT * FROM books"))
  .then((rows) => {
    rows.forEach((row) => console.log(`${row.id} ${row.title}`));
  })
  .then(() => promiseRun("DROP TABLE books"));
