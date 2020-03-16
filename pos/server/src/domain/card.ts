import { Entry } from "./db";

export class Card extends Entry {
  constructor(
    public code: string,
    public scannedDate: String,
    public amount: number
  ) {
    super();
  }
  static getDate() {
    return (
      ("0" + new Date().getHours()).slice(-2) +
      ":" +
      ("0" + new Date().getMinutes()).slice(-2)
    );
  }
}
