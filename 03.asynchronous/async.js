import * as db_operation_function from "./function_module.js";

async function main() {
  await db_operation_function.createTable();
  await db_operation_function.insertBookTitleZeroRuby();
  await db_operation_function.insertBookTitleCherryBook();
  await db_operation_function.outputTitleDisplay();
  await db_operation_function.deleteTable();
}

main();