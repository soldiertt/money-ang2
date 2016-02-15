import {CatType} from '../core/category-type.enum'
import {CatFrequency} from '../core/category-frequency.enum'
import {Tx} from '../core/tx.class'
import {CategoryLink} from './category-link.class'

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
    //Set default compta month and year to one month ago (most current)
    let now = new Date();
    let oneMonthAgoDate = new Date(now.setMonth(now.getMonth() - 1));
    this.comptaMonth = oneMonthAgoDate.getMonth();
    this.comptaYear = oneMonthAgoDate.getFullYear();
  }
}
