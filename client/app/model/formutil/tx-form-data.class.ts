import {CatType, CatFrequency} from '../core/money-enums'
import {Tx} from '../core/tx.class'

class CategoryLink {
  categoryId: string;
  categoryYear: number;
  periodIndex:number;

  constructor() {
    this.categoryId = "";
  }
}

export class TxFormData {
  categoryType:CatType;
  categoryFrequency:CatFrequency;
  categoryLink:CategoryLink;
  comptaDate:boolean;
  comptaMonth:number;
  comptaYear:number;
  tx: Tx;

  constructor(tx: Tx) {
    this.tx = tx;
    if (tx.amount < 0) {
      this.categoryType = CatType.OTHER;
    } else {
      this.categoryType = CatType.INCOMING;
    }
    this.categoryFrequency = CatFrequency.MONTHLY;
    this.categoryLink = new CategoryLink();
    this.resetComptaDate();
  }

  resetComptaDate() {
    this.comptaDate = false;
    //Set default compta month and year to one month ago from tx date (most current)
    let txDate = new Date(this.tx.date.getTime());
    let oneMonthAgoDate = new Date(txDate.setMonth(txDate.getMonth() - 1));
    this.comptaMonth = oneMonthAgoDate.getMonth();
    this.comptaYear = oneMonthAgoDate.getFullYear();
  }
}
