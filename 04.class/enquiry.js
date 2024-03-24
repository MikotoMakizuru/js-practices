import Enquirer from "enquirer";

export default class Enquiry {
  async selectMemoData(memoTitlesAndIds, action) {
    const choices = await memoTitlesAndIds.map((row) => ({
      title: row.title,
      value: row,
    }));

    const question = {
      type: "select",
      name: "memoData",
      message: `Choose a memo you want to ${action} :`,
      choices: choices,
      result() {
        return this.focused.value;
      },
    };
    const answer = await Enquirer.prompt(question);
    return answer.memoData;
  }
}
