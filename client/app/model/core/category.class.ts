import {CatType, CatFrequency} from './money-enums'
import {Tx} from "./tx.class";

export class Period {
  id: string;
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

export class Category {
  id: string;
  name: string;
  type:CatType;
  frequency:CatFrequency;
  years: Array<number>;
  nbPeriods: number;
  periods:Array<Period>;

  constructor(name:string, type: CatType, frequency: CatFrequency, years:Array<number>) {
    this.name = name;
    this.type = type;
    this.frequency = frequency;
    this.years = years;
    this.nbPeriods = this._getNbPeriods();
    this.periods = [];
    for (let i = 0; i < years.length; i++) {
      for (let j = 0; j < this.nbPeriods; j++) {
        this.periods.push(new Period(years[i], j));
      }
    }
  }

  private _getNbPeriods():number {
    switch(this.frequency) {
      case CatFrequency.MONTHLY:
        return 12;
      case CatFrequency.QUARTER:
        return 4;
      case CatFrequency.YEARLY:
        return 1;
    }
  }

}
