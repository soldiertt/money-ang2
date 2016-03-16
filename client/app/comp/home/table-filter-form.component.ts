import {Component, EventEmitter, Output} from 'angular2/core'
import {DisplayParamService} from '../../service/display-param.service'
import {FormUtilsService} from '../../service/form-utils.service'

@Component({
    selector: 'money-table-filter-form',
    templateUrl: 'html/home/table-filter-form.html'
})
export class TableFilterFormComponent {
    allYears: Array<number>;
    catTypeFixed:boolean = true;
    catTypeOther:boolean = true;
    catTypeIncoming:boolean = true;
    catFreqMonthly:boolean = true;
    catFreqQuarter:boolean = true;
    catFreqYearly:boolean = true;
    _displayTotals:boolean = true;

    constructor(public displayParamService: DisplayParamService, public formUtilsService: FormUtilsService) {
      this.allYears = this.formUtilsService.getAppYears();
    }

    onFilterUpdated($event) {
      let types = [];
      let frequencies = [];
      if (this.catTypeFixed)    { types.push("FIXED");          }
      if (this.catTypeOther)    { types.push("OTHER");          }
      if (this.catTypeIncoming) { types.push("INCOMING");       }
      if (this.catFreqMonthly)  { frequencies.push("MONTHLY");  }
      if (this.catFreqQuarter)  { frequencies.push("QUARTER");  }
      if (this.catFreqYearly)   { frequencies.push("YEARLY");   }

      this.displayParamService.types = types;
      this.displayParamService.frequencies = frequencies;
    }

    get displayTotals() {
      return this._displayTotals;
    }

    set displayTotals(value: boolean) {
      this._displayTotals = value;
      this.displayParamService.showTotals = value;
    }
}
