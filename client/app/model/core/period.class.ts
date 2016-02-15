import {Tx} from "./tx.class";

export class Period {
  year:number;
  index:number;
  total:number;
  txList:Array<Tx>;

  constructor(year:number, index:number) {
    this.year = year;
    this.index = index;
    this.total = 0;
    this.txList = [];
  }

  addTx(tx:Tx) {
    this.txList.push(tx);
    this.total += tx.amount;
  }
}
