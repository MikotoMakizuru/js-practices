import * as db_operation_function from "./function_module.js";

const createTableSql =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
const insertRecordSql = "INSERT INTO book (title) VALUES (?)";
const booksTitle = "JavaScript Primer 迷わないための入門";
const selectDataSql = "SELECT * FROM booka";
const deleteTableSql = "DROP TABLE books";

db_operation_function
  .createTable(createTableSql)
  .then(() => db_operation_function.insertRecord(insertRecordSql, booksTitle))
  .catch((error) => {
    console.error("追加", error.message);
  })
  .then(() => db_operation_function.selectData(selectDataSql))
  .catch((error) => {
    console.error("取得", error.message);
  })
  .then(() => db_operation_function.deleteTable(deleteTableSql));
