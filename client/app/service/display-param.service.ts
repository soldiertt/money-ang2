import {Injectable, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable'

@Injectable()
export class DisplayParamService {
  _types:Array<string> = ["FIXED", "OTHER", "INCOMING"];
  _frequencies:Array<string> = ["MONTHLY", "QUARTER", "YEARLY"];
  showTotals: boolean = true;
  filtersUpdated: EventEmitter<string> = new EventEmitter<string>();

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
