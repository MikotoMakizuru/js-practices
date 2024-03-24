import minimist from "minimist";
import readline from "readline";
import Memo from "./memo.js";
import Enquiry from "./enquiry.js";

async function main() {
  async function getStdin() {
    return new Promise((resolve) => {
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
        resolve(lines);
      });
    });
  }

  const argv = minimist(process.argv.slice(2));
  const memo = new Memo();
  const enquiry = new Enquiry();

  if (!process.stdin.isTTY) {
    try {
      const lines = await getStdin();
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
        const answer = await enquiry.selectMemoData(memoTitlesAndIds, "see");
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
        const answer = await enquiry.selectMemoData(memoTitlesAndIds, "delete");
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

main();
