import {Injectable} from "@angular/core";
import {Control, ControlGroup} from "@angular/common";

@Injectable()
export class FormUtilsService {

    reset(form: ControlGroup, ...controlNames: Array<string>): void {
      for (let controlName of controlNames) {
        (<Control> form.controls[controlName]).updateValue("");
      }
    }

    getAppYears(): Array<number> {
      let startYear = 2015;
      let endYear = new Date().getFullYear();
      let years: Array<number> = [];
      for (let year = startYear; year <= endYear; year++) {
        years.push(year);
      }
      return years;
    }

    getAppMonths(): Array<any> {
      return [{value: 0, name: "January"}, {value: 1, name: "February"}, {value: 2, name: "March"},
        {value: 3, name: "April"}, {value: 4, name: "May"}, {value: 5, name: "June"},
        {value: 6, name: "July"}, {value: 7, name: "Augustus"}, {value: 8, name: "September"},
        {value: 9, name: "October"}, {value: 10, name: "November"}, {value: 11, name: "December"}];
    }
}
