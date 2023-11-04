import * as db_operation_function from "./function_module.js";

db_operation_function
  .createTable()
  .then(() => db_operation_function.insertBookTitleZeroRuby())
  .catch(() => {
    console.log("本のタイトルの追加に失敗（ゼロからわかるRuby超入門）");
  })
  .then(() => db_operation_function.insertBookTitleCherryBook())
  .catch(() => {
    console.log("本のタイトルの追加に失敗（プロを目指す人のためのRuby入門）");
  })
  .then(() => db_operation_function.outputTitleDisplay())
  .then(() => db_operation_function.deleteTable());
