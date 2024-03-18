import readline from "readline";
import sqlite3 from "sqlite3";
import minimist from "minimist";
import Enquirer from "enquirer";

function run(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (err) {
      if (!err) {
        resolve(this);
      } else {
        reject(err);
      }
    });
  });
}

function all(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    });
  });
}

const argv = minimist(process.argv.slice(2));
const db = new sqlite3.Database("./DB/memo.sqlite3");

async function main() {
  if (argv.l) {
    const titles = await all(db, "SELECT title FROM memos");

    titles.forEach((row) => {
      console.log(row.title);
    });
  } else if (argv.r) {
    const memos = await all(db, "SELECT * FROM memos");
    const titles = await memos.map((row) => {
      return row.title;
    });

    const question = {
      type: "select",
      name: "title",
      message: "Choose a note you want to see:",
      choices: titles,
    };

    const answer = await Enquirer.prompt(question);
    const selectedMemo = memos.find((memo) => memo.title === answer.title);
    console.log(selectedMemo.content);
  } else if (argv.d) {
    const memos = await all(db, "SELECT * FROM memos");

    const titles = await memos.map((row) => {
      return row.title;
    });

    const question = {
      type: "select",
      name: "favorite",
      message: "Choose a note you want to delete:",
      choices: titles,
    };

    const answer = await Enquirer.prompt(question);
    const selectedTitle = answer.favorite;

    await run(db, "DELETE FROM memos WHERE title = ?", [selectedTitle]);
    console.log(`Note "${selectedTitle}" has been deleted.`);
  } else {
    await run(
      db,
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)",
    );

    const lines = [];
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    reader.on("line", (line) => {
      lines.push(line);
    });

    reader.on("close", () => {
      const title = lines[0];
      const content = lines.join("\n");

      run(db, "INSERT INTO memos (title, content) VALUES (?, ?)", [
        title,
        content,
      ]);
    });
  }
}

main();

export default main;
