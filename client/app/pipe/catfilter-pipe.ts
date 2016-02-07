import {Pipe} from "angular2/core";

@Pipe({
  name: "catfilter"
})
export class CatfilterPipe {
  transform(categories, args){
    if (categories) {
      let [types, frequencies] = args;
      return categories.filter((item)=> types.indexOf(item.type) !== -1 && frequencies.indexOf(item.frequency) !== -1 );
    } else {
      return categories;
    }
  }
}
