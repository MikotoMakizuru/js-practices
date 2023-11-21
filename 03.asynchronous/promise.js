import * as db_operation_function from "./function_module.js";

const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
const insertRecordSql = "INSERT INTO books (title) VALUES (?)";
const booksTitle = "JavaScript Primer 迷わないための入門";
const selectDataSql = "SELECT * FROM books";
const deleteTableSql = "DROP TABLE books";

db_operation_function
  .createTable(createTableSql)
  .then(() => db_operation_function.insertRecord(insertRecordSql, booksTitle))
  .then((lastID) => {
    console.log(`ID: ${lastID}`);
  })
  .then(() => db_operation_function.selectData(selectDataSql))
  .then((rows) => {
    console.log(`${rows.id} ${rows.title}`);
  })
  .then(() => db_operation_function.deleteTable(deleteTableSql));
