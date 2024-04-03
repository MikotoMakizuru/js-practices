import minimist from "minimist";
import readline from "readline";
import Memo from "./memo.js";
import MemoHandler from "./memoHandler.js";

const argv = minimist(process.argv.slice(2));

async function main() {
  const memo = new Memo();
  const memoHandler = new MemoHandler();

  if (!process.stdin.isTTY || Object.keys(argv).length < 2) {
    try {
      const lines = await readStdin();
      const title = await lines[0];
      const content = await lines.join("\n");

      await memo.createTable();
      await memo.insert(title, content);
      console.log(`✅ タイトル "${title}" のメモが追加されました。`);
    } catch (err) {
      if (err instanceof Error) {
        console.log("メモを追加できませんでした。error:", err.message);
      } else {
        throw err;
      }
    }
  } else if (argv.l) {
    try {
      const memoTitlesAndIds = await memo.fetchTitlesAndIds();

      if (memoTitlesAndIds.length > 0) {
        memoTitlesAndIds.forEach((row) => {
          console.log(row.title);
        });
      } else {
        console.log("メモがありません");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("メモの一覧の取得に失敗しました。error:", err.message);
      } else {
        throw err;
      }
    }
  } else if (argv.r) {
    try {
      const memoTitlesAndIds = await memo.fetchTitlesAndIds();

      if (memoTitlesAndIds.length > 0) {
        const answer = await memoHandler.selectMemoData(
          memoTitlesAndIds,
          "see",
        );
        const selectedMemoData = await memo.select(answer.id);
        console.log(selectedMemoData.content);
      } else {
        console.log("メモがありません");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("メモの取得に失敗しました。error:", err.message);
      } else {
        throw err;
      }
    }
  } else if (argv.d) {
    try {
      const memoTitlesAndIds = await memo.fetchTitlesAndIds();

      if (memoTitlesAndIds.length > 0) {
        const answer = await memoHandler.selectMemoData(
          memoTitlesAndIds,
          "delete",
        );
        await memo.delete(answer.id);
        console.log(`🗑️  タイトル "${answer.title}" のメモが削除されました。`);
      } else {
        console.log("メモがありません");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("メモの削除に失敗しました。error:", err.message);
      } else {
        throw err;
      }
    }
  }
}

function readStdin() {
  return new Promise((resolve) => {
    const lines = [];
    let reader;

    if (!process.stdin.isTTY || Object.keys(argv).length < 2) {
      reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
    } else {
      reader = readline.createInterface({
        input: process.stdin,
      });
    }

    reader.on("line", (line) => {
      lines.push(line);
    });

    reader.on("close", () => {
      resolve(lines);
    });
  });
}

main();
