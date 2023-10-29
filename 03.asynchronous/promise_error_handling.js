import * as db_operation_function from "./function_module.js";

db_operation_function
  .createTable()
  .then(() => db_operation_function.insertRecord())
  .catch(() => {
    console.log("本のタイトル追加失敗");
  })
  .then(() => db_operation_function.outputTitleDisplay())
  .catch(() => {
    console.log("本のタイトル表示失敗");
  })
  .then(() => db_operation_function.deleteTable());
