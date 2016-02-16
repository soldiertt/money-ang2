import {Period} from './period.class'
import {CatType} from './category-type.enum'
import {CatFrequency} from './category-frequency.enum'

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
