import {Tx} from "./tx.class";

export class Period {
  total:number;
  tx:Array<Tx>;

  constructor() {
    this.total = 0;
  }

  addTx(tx:Tx) {
    this.tx.push(tx);
    this.total += tx.amount;
  }
}
