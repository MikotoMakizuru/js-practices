import * as db_operation_function from "./function_module.js";

db_operation_function
  .createTable()
  .then(() => db_operation_function.insertBookTitleZeroRuby())
  .then(() => db_operation_function.insertBookTitleCherryBook())
  .then(() => db_operation_function.outputTitleDisplay())
  .then(() => db_operation_function.deleteTable());
