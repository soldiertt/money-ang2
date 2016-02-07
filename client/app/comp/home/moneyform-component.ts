import {Component} from 'angular2/core';
import {DisplayParamService} from '../../service/display-param.service';

@Component({
    selector: 'money-form',
    templateUrl: 'app/view/home/money-form.html'
})

export class MoneyFormComponent {
    _catTypeFixed:boolean = true;
    _catTypeOther:boolean = true;
    _catFreqMonthly:boolean = true;
    _catFreqQuarter:boolean = true;
    _catFreqYearly:boolean = true;

    constructor(public displayParamService: DisplayParamService) {
    }

    /* GETTERS */
    get catTypeFixed() {
      return this._catTypeFixed;
    }
    get catTypeOther() {
      return this._catTypeOther;
    }
    get catFreqMonthly() {
      return this._catFreqMonthly;
    }
    get catFreqQuarter() {
      return this._catFreqQuarter;
    }
    get catFreqYearly() {
      return this._catFreqYearly;
    }

    /* SETTERS */
    set catTypeFixed(value) {
      this._catTypeFixed = value;
      this.onSubmit();
    }
    set catTypeOther(value) {
      this._catTypeOther = value;
      this.onSubmit();
    }
    set catFreqMonthly(value) {
      this._catFreqMonthly = value;
      this.onSubmit();
    }
    set catFreqQuarter(value) {
      this._catFreqQuarter = value;
      this.onSubmit();
    }
    set catFreqYearly(value) {
      this._catFreqYearly = value;
      this.onSubmit();
    }

    onSubmit() {
      let types = [];
      let frequencies = [];
      if (this.catTypeFixed)    { types.push("fixed");          }
      if (this.catTypeOther)    { types.push("other");          }
      if (this.catFreqMonthly)  { frequencies.push("monthly");  }
      if (this.catFreqQuarter)  { frequencies.push("quarter");  }
      if (this.catFreqYearly)   { frequencies.push("yearly");   }

      this.displayParamService.types = types;
      this.displayParamService.frequencies = frequencies;
    }
}
