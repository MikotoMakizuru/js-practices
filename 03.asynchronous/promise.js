import * as db_operation_function from "./function_module.js";

db_operation_function
  .promiseRun(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  )
  .then(() =>
    db_operation_function.promiseRun(
      "INSERT INTO books (title) VALUES (?)",
      "JavaScript Primer 迷わないための入門"
    )
  )
  .then((lastID) => {
    console.log(`ID: ${lastID}`);
  })
  .then(() => db_operation_function.promiseAll("SELECT * FROM books"))
  .then((rows) => {
    rows.forEach((row) => console.log(`${row.id} ${row.title}`));
  })
  .then(() => db_operation_function.promiseRun("DROP TABLE books"));
