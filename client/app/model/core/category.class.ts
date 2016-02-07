import {Period} from "./period.class";

export class Category {
  id: string;
  name:string;
  type:string;
  frequency:string;
  year: number;
  income: boolean;
  occSize: number;
  periods:Array<Period>;

  constructor(name:string, type:string, frequency:string, year:number, income: boolean = false) {
    this.name = name;
    this.type = type;
    this.frequency = frequency;
    this.year = year;
    this.income = income;
    let occSize;
    switch(frequency) {
      case "MONTHLY":
        occSize = 12;
        break;
      case "QUARTER":
        occSize = 4;
        break;
      case "YEARLY":
        occSize = 1;
        break;
    }
    this.occSize = occSize;
    this.periods = new Array<Period>(occSize);
  }
}
