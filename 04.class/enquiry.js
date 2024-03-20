import Enquirer from "enquirer";

export default class Enquiry {
  async selectMemoData(choices) {
    const question = {
      type: "select",
      name: "memoData",
      message: "Choose a note you want to see:",
      choices: choices,
      result() {
        return this.focused.value;
      },
    };
    const answer = await Enquirer.prompt(question);
    return answer.memoData;
  }
}
