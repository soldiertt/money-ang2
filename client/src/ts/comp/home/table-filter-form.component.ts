import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {FilterPreset}             from "../../model/core/filter-preset.class";
import {DisplayParamService}      from "../../service/display-param.service";
import {FormUtilsService}         from "../../service/form-utils.service";
import {FilterPresetRestService}  from "../../service/filter-preset-rest.service";

@Component({
    selector: "money-table-filter-form",
    templateUrl: "assets/html/home/table-filter-form.html",
    styleUrls: ["assets/css/table-filter-form.css"]
})
export class TableFilterFormComponent {
  allYears: Array<number>;
  allPresets: Array<FilterPreset> = [];
  filterForm: FormGroup;
  presetNameCtrl: FormControl;
  selectedPresetCtrl: FormControl;
  editPresetName: boolean;

  constructor(public displayParamService: DisplayParamService,
    public formUtilsService: FormUtilsService, fb: FormBuilder,
    private _filterPresetRestService: FilterPresetRestService) {
    this.allYears = this.formUtilsService.getAppYears();
    this._filterPresetRestService.list().subscribe(allPresets => {
      this.allPresets = allPresets;
    });

    this.presetNameCtrl = fb.control("", Validators.required);
    this.selectedPresetCtrl = fb.control("");
    this.filterForm = fb.group({
      presetName: this.presetNameCtrl,
      selectedPreset: this.selectedPresetCtrl,
      selectedYear: fb.control(""),
      catFixed: fb.control(""),
      catOther: fb.control(""),
      catIncoming: fb.control(""),
      freqMonthly: fb.control(""),
      freqQuarter: fb.control(""),
      freqYearly: fb.control(""),
      displayTotal: fb.control("")
    });

    this.filterForm.controls["selectedPreset"].valueChanges.subscribe((presetId) => {
      this.loadFilter(presetId);
    });
  }

  private loadFilter(presetId: string) {
    if (presetId !== "") {
      let selectedFilter: FilterPreset = this.allPresets.filter(elem => elem.id === presetId)[0];
      this.displayParamService.filterPreset = FilterPreset.build(selectedFilter);
      this.displayParamService.hasChanged();
    }
  }

  notExistsCurrentFilter(): boolean {
    let actualKey: string = FilterPreset.getKey(this.displayParamService.filterPreset);
    return !this.allPresets.some(preset => { return FilterPreset.getKey(preset) === actualKey; });
  }

  onFilterUpdated($event) {
    this.displayParamService.hasChanged();
    this.selectedPresetCtrl.setValue("");
  }

  onAskSave() {
    this.editPresetName = true;
  }

  onSavePreset() {
    this.editPresetName = false;
    if (this.filterForm.valid) {
      this.displayParamService.filterPreset.name = this.presetNameCtrl.value;
      this._filterPresetRestService.create(this.displayParamService.filterPreset).subscribe(filterPreset => {
        this.allPresets.push(filterPreset);
      });
    }
  }

  onCancelPreset() {
    this.editPresetName = false;
  }
}
