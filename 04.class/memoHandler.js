import Enquirer from "enquirer";

export default class MemoHandler {
  async choose(memos, promptText) {
    const choices = memos.map((memo) => ({
      title: memo.title,
      value: memo,
    }));

    const question = {
      type: "select",
      name: "memo",
      message: promptText,
      choices,
      result() {
        return this.focused.value;
      },
    };

    try {
      const answer = await Enquirer.prompt(question);
      return answer.memo;
    } catch (err) {
      throw new Error("Error occurred while choosing memo data");
    }
  }
}
