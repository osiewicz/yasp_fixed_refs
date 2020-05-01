import { Grammarly } from "@stewartmcgown/grammarly-api";

export class GrammarApi {
  static validateText = async (text: string) => {
    const free = new Grammarly();
    try {
      return await free.analyse(text);
    } catch (err) {
      return err;
    }
  };
}
