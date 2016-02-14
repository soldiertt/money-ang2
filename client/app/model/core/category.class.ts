import {Period} from './period.class'
import {CatType} from './category-type.enum'
import {CatFrequency} from './category-frequency.enum'

export class Category {
  id: string;
  name: string;
  type:CatType;
  frequency:CatFrequency;
  years: Array<number>;
  occSize: number;
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
    this.occSize = occSize;
    this.periods = new Array<Period>(occSize);
  }
}
