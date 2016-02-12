import {Component} from 'angular2/core';
import {DisplayParamService} from '../../service/display-param.service';

@Component({
    selector: 'money-table-filter-form',
    templateUrl: 'app/view/home/table-filter-form.html'
})

export class TableFilterFormComponent {
    catTypeFixed:boolean = true;
    catTypeOther:boolean = true;
    catFreqMonthly:boolean = true;
    catFreqQuarter:boolean = true;
    catFreqYearly:boolean = true;

    constructor(public displayParamService: DisplayParamService) {
    }

    onFilterUpdated($event) {
      let types = [];
      let frequencies = [];
      if (this.catTypeFixed)    { types.push("FIXED");          }
      if (this.catTypeOther)    { types.push("OTHER");          }
      if (this.catFreqMonthly)  { frequencies.push("MONTHLY");  }
      if (this.catFreqQuarter)  { frequencies.push("QUARTER");  }
      if (this.catFreqYearly)   { frequencies.push("YEARLY");   }

      this.displayParamService.types = types;
      this.displayParamService.frequencies = frequencies;
    }

}
