import {Account} from "./account.class";

export class Tx {
  id: string;
  ref: string;
  date: Date;
  amount:number;
  ownAccount: Account;
  thirdPartyAccount: Account;
  communication: string;
  dateCompta: Date;
  categoryId: string;
  categoryIndex:number;
  comment: string;

  constructor() {
    this.ownAccount = new Account();
    this.thirdPartyAccount = new Account();
  }

}
