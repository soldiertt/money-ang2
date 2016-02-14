import {Pipe} from "angular2/core";
import {Tx} from "../model/core/tx.class";

@Pipe({
    name: "txSorter"
})
export class TxSorterPipe {

  transform(array: Array<Tx>, args): Array<Tx> {
    if (array) {
      array.sort((a:Tx, b:Tx) => {
        if (a.date > b.date) {
          return 1;
        } else if (a.date < b.date) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    return array;
  }
}
