import {Pipe} from "angular2/core";

@Pipe({
  name: "periodFilter"
})
export class PeriodFilterPipe {
  transform(periods, args){
    if (periods) {
      let [year] = args;
      return periods.filter(period => period.year == year);
    } else {
      return periods;
    }
  }
}
