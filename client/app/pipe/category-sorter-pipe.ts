import {Pipe} from "angular2/core";
import {Category} from "../model/core/category.class";

@Pipe({
    name: "categorySorter"
})
export class CategorySorterPipe {

    transform(array: Array<Category>, args): Array<Category> {

      if (array) {
        array.sort((a:Category, b:Category) => {
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
