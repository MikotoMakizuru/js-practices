import Enquirer from "enquirer";

export default class MemoHandler {
  async selectMemoData(memos, promptText) {
    const choices = await memos.map((memo) => ({
      title: memo.title,
      value: memo,
    }));

    const question = {
      type: "select",
      name: "memoData",
      message: `${promptText}`,
      choices: choices,
      result() {
        return this.focused.value;
      },
    };

    try {
      const answer = await Enquirer.prompt(question);
      return answer.memoData;
    } catch (err) {
      throw new Error("Error occurred while selecting memo data");
    }
  }
}
