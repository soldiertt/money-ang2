import {Period} from './period.class'
import {CatType} from './category-type.enum'
import {CatFrequency} from './category-frequency.enum'

export class Category {
  id: string;
  name: string;
  type:CatType;
  frequency:CatFrequency;
  years: Array<number>;
  periods:Array<Period>;

  constructor(name:string, type: CatType, frequency: CatFrequency, years:Array<number>) {
    this.name = name;
    this.type = type;
    this.frequency = frequency;
    this.years = years;
    let occSize;
    switch(frequency) {
      case CatFrequency.MONTHLY:
        occSize = 12;
        break;
      case CatFrequency.QUARTER:
        occSize = 4;
        break;
      case CatFrequency.YEARLY:
        occSize = 1;
        break;
    }
    this.periods = [];
    for (let i = 0; i < years.length; i++) {
      for (let j = 0; j < occSize; j++) {
        this.periods.push(new Period(years[i], j));
      }
    }
  }
}
