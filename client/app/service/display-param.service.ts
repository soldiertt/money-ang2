import {Injectable, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class DisplayParamService {
  private _year:number;
  catTypeFixed:boolean = true;
  catTypeOther:boolean = true;
  catTypeIncoming:boolean = true;
  catFreqMonthly:boolean = true;
  catFreqQuarter:boolean = true;
  catFreqYearly:boolean = true;
  showTotals: boolean = true;
  filtersUpdated: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this._year = (new Date()).getFullYear();
  }

  get year() {
    return this._year;
  }

  set year(year:number) {
    this._year = year;
    this.filtersUpdated.emit("year");
  }

  hasChanged() {
    this.filtersUpdated.emit("update");
  }

  get types() {
    let types = [];
    if (this.catTypeFixed)    { types.push("FIXED");          }
    if (this.catTypeOther)    { types.push("OTHER");          }
    if (this.catTypeIncoming) { types.push("INCOMING");       }
    return types;
  }

  get frequencies() {
    let frequencies = [];
    if (this.catFreqMonthly)  { frequencies.push("MONTHLY");  }
    if (this.catFreqQuarter)  { frequencies.push("QUARTER");  }
    if (this.catFreqYearly)   { frequencies.push("YEARLY");   }
    return frequencies;
  }

}
