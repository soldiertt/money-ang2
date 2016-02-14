import {Account} from "./account.class";
import {CategoryLink} from "./category-link.class";

export class Tx {
  id: string;
  ref: string;
  date: Date;
  amount:number;
  ownAccount: Account;
  thirdPartyAccount: Account;
  communication: string;
  dateCompta: Date;
  comment: string;
  categoryLink: CategoryLink;

  constructor() {
    this.ownAccount = new Account();
    this.thirdPartyAccount = new Account();
  }

}
