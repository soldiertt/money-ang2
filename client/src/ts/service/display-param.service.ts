import {Injectable, EventEmitter} from "@angular/core";
import {FilterPreset} from "../model/core/filter-preset.class";

@Injectable()
export class DisplayParamService {
  private _year: number;
  filterPreset: FilterPreset = new FilterPreset();
  filtersUpdated: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this._year = (new Date()).getFullYear();
  }

  get year() {
    return this._year;
  }

  set year(year: number) {
    this._year = year;
    this.filtersUpdated.emit("year");
  }

  hasChanged() {
    this.filtersUpdated.emit("update");
  }

  get types() {
    let types = [];
    if (this.filterPreset.catTypeFixed)    { types.push("FIXED");          }
    if (this.filterPreset.catTypeOther)    { types.push("OTHER");          }
    if (this.filterPreset.catTypeIncoming) { types.push("INCOMING");       }
    return types;
  }

  get frequencies() {
    let frequencies = [];
    if (this.filterPreset.catFreqMonthly)  { frequencies.push("MONTHLY");  }
    if (this.filterPreset.catFreqQuarter)  { frequencies.push("QUARTER");  }
    if (this.filterPreset.catFreqYearly)   { frequencies.push("YEARLY");   }
    return frequencies;
  }

}
