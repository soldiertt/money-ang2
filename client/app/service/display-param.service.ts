import {Injectable} from 'angular2/core';

@Injectable()
export class DisplayParamService {
  private _types:Array<string> = ["FIXED", "OTHER"];
  private _frequencies:Array<string> = ["MONTHLY", "QUARTER", "YEARLY"];

  get types():Array<string> {
    return this._types;
  }
  set types(inTypes:Array<string>) {
    this._types = inTypes;
  }
  get frequencies():Array<string> {
    return this._frequencies;
  }
  set frequencies(inFrequencies:Array<string>) {
    this._frequencies = inFrequencies;
  }
}
