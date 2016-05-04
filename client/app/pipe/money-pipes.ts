import {Pipe} from "@angular/core";
import {Category} from "../model/core/category.class";

@Pipe({
    name: "categorySorter"
})
export class CategorySorterPipe {

    transform(array: Array<Category>, args): Array<Category> {

      if (array) {
        array.sort((a: Category, b: Category) => {
          if (a.type > b.type) {
            return 1;
          } else if (a.type < b.type) {
            return -1;
          } else {
            // they have same type, check the frequency
            if (a.frequency > b.frequency) {
              return 1;
            } else if (a.frequency < b.frequency) {
              return -1;
            } else {
              // they have same frequency, check the name
              if (a.name > b.name) {
                return 1;
              } else if (a.name < b.name) {
                return -1;
              } else {
                return 0;
              }
            }
          }
        });
      }
      return array;
    }
}

@Pipe({
  name: "periodFilter"
})
export class PeriodFilterPipe {
  transform(periods, year) {
    if (periods) {
      return periods.filter(period => period.year === year);
    } else {
      return periods;
    }
  }
}

@Pipe({
  name: "catfilter"
})
export class CatfilterPipe {
  transform(categories, types, frequencies, years) {
    if (categories) {
      let filtered = categories.filter((item) => types.indexOf(item.type) !== -1 && frequencies.indexOf(item.frequency) !== -1 );
      if (years) {
        filtered = filtered.filter((item) => years.every((year) => item.years.indexOf(year) !== -1));
      }
      return filtered;
    } else {
      return categories;
    }
  }
}
