import {CatType} from '../core/category-type.enum'
import {CatFrequency} from '../core/category-frequency.enum'

export class TxFormData {
  categoryType:CatType;
  categoryFrequency:CatFrequency;
  comptaDate:Date;
  comptaMonth:number;
  comptaYear:number;

  constructor(amount: number) {
    if (amount < 0) {
      this.categoryType = CatType.OTHER;
    } else {
      this.categoryType = CatType.INCOMING;
    }
    this.categoryFrequency = CatFrequency.MONTHLY;
    this.resetComptaDate();
  }

  resetComptaDate() {
    this.comptaDate = undefined;
    //Set default compta month and year to one month ago (most current)
    let now = new Date();
    let oneMonthAgoDate = new Date(now.setMonth(now.getMonth() - 1));
    this.comptaMonth = oneMonthAgoDate.getMonth();
    this.comptaYear = oneMonthAgoDate.getFullYear();
  }
}
