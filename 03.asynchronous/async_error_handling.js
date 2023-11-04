import * as db_operation_function from "./function_module.js";

async function main() {
  await db_operation_function.createTable();
  try {
    await db_operation_function.insertBookTitleZeroRuby();
  } catch (error) {
    console.log("本のタイトルの追加に失敗（ゼロからわかるRuby超入門）");
  }
  try {
    await db_operation_function.insertBookTitleCherryBook();
  } catch {
    console.log("本のタイトルの追加に失敗（プロを目指す人のためのRuby入門）");
  }
  try {
    await db_operation_function.outputTitleDisplay();
  } catch {
    console.log("本のタイトルの表示に失敗");
  }
  await db_operation_function.deleteTable();
}

main();
