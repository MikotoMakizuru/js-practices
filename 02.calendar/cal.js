import minimist from "minimist";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja.js";

dayjs.locale(ja);

var argv = minimist(process.argv.slice(2));

const year = argv["y"] || dayjs().format("YYYY");
const month = argv["m"] || dayjs().format("M");
const weeks = ["日", "月", "火", "水", "木", "金", "土"];
const lastDay = dayjs(new Date(year, month, 0));

// 1日の曜日を 0-6 で返す、日曜日は1、土曜日は0
let startWeekDay = dayjs(new Date(year, month, -1, 1));

console.log(`${month}月 ${year}`.padStart(13));
console.log(weeks.join(" "));
process.stdout.write("   ".repeat(startWeekDay.day()));

for (let i = 1; i <= lastDay.date(); i++) {
  process.stdout.write(`${i}`.padStart(3));
  if (startWeekDay.date(i).day() === 6 || i === lastDay.date()) {
    process.stdout.write("\n");
  }
}
