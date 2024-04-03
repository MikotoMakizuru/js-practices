import minimist from "minimist";
import readline from "readline";
import MemoAccessor from "./memoAccessor.js";
import MemoHandler from "./memoHandler.js";

const argv = minimist(process.argv.slice(2));

async function main() {
  const memoAccessor = new MemoAccessor();
  const memoHandler = new MemoHandler();

  if (!process.stdin.isTTY || Object.keys(argv).length < 2) {
    try {
      const lines = await readStdin();
      const title = lines[0];
      const content = lines.join("\n");

      await memoAccessor.createTable();
      await memoAccessor.insert(title, content);
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
      const memos = await memoAccessor.fetchAll();

      if (memos.length > 0) {
        memos.forEach((memo) => {
          console.log(memo.title);
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
      const memos = await memoAccessor.fetchAll();

      if (memos.length > 0) {
        const answer = await memoHandler.pickup(
          memos,
          "Choose a note you want to see:",
        );
        const selectedMemoData = await memoAccessor.select(answer.id);
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
      const memos = await memoAccessor.fetchAll();

      if (memos.length > 0) {
        const answer = await memoHandler.pickup(
          memos,
          "Choose a note you want to delete:",
        );
        await memoAccessor.delete(answer.id);
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
  return new Promise((resolve, reject) => {
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
      if (!lines.every((line) => line.trim() === "")) {
        resolve(lines);
      } else {
        reject(new Error("No input provided."));
      }
    });
  });
}

main();
