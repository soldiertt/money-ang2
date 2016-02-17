class Account {
  name:string;
  number:string;
}

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

  constructor() {
    this.ownAccount = new Account();
    this.thirdPartyAccount = new Account();
  }

}
