import * as db_operation_function from "./function_module.js";

async function main() {
  await db_operation_function.createTable();
  try {
    await db_operation_function.insertRecord();
  } catch (error) {
    console.log("本のタイトル追加失敗");
  }
  try {
    await db_operation_function.outputTitleDisplay();
  } catch {
    console.log("本のタイトル表示失敗");
  }
  await db_operation_function.deleteTable();
}

main();
