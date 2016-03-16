import {Injectable, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class DisplayParamService {
  private _year:number;
  private _types:Array<string> = ["FIXED", "OTHER", "INCOMING"];
  private _frequencies:Array<string> = ["MONTHLY", "QUARTER", "YEARLY"];
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
  get types() {
    return this._types;
  }
  set types(types:Array<string>) {
    this._types = types;
    this.filtersUpdated.emit("types");
  }
  get frequencies() {
    return this._frequencies;
  }
  set frequencies(frequencies:Array<string>) {
    this._frequencies = frequencies;
    this.filtersUpdated.emit("frequencies");
  }
}
