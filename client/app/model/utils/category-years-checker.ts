import {Injectable} from "@angular/core";
import {Category, Period} from "../core/category.class";

@Injectable()
export class CategoryYearsChecker {

  constructor() {
  }

  public removedYears(oldYears: Array<number>, newYears: Array<number>): Array<number> {
    return oldYears.filter(oldYear => newYears.indexOf(oldYear) === -1);
  }

  public addedYears(oldYears: Array<number>, newYears: Array<number>): Array<number> {
    return newYears.filter(newYear => oldYears.indexOf(newYear) === -1);
  }

  public addMissingPeriods(category: Category, addedYears: Array<number>): Category {
    addedYears.forEach(addedYear => {
      for (let i = 0; i < category.nbPeriods; i++) {
        category.periods.push(new Period(addedYear, i));
      }
    });
    return category;
  }

  public removedOldPeriods(category: Category, removedYears: Array<number>): Category {
    category.periods = category.periods.filter(period => removedYears.indexOf(period.year) == -1);
    return category;
  }

}
