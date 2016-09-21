import {Component} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {FilterPreset}             from "../../model/core/filter-preset.class";
import {DisplayParamService}      from "../../service/display-param.service";
import {FormUtilsService}         from "../../service/form-utils.service";
import {FilterPresetRestService}  from "../../service/filter-preset-rest.service";

@Component({
    selector: "money-table-filter-form",
    templateUrl: "app/comp/home/table-filter-form.html",
    styleUrls: ["app/comp/home/table-filter-form.css"]
})
export class TableFilterFormComponent {
    allYears: Array<number>;
    allPresets: Array<FilterPreset> = [];
    filterForm: FormGroup;
    editPresetName: boolean;

    constructor(public displayParamService: DisplayParamService,
                public formUtilsService: FormUtilsService, fb: FormBuilder,
                private _filterPresetRestService: FilterPresetRestService) {
        this.allYears = this.formUtilsService.getAppYears();
        this._filterPresetRestService.list().subscribe(allPresets => {
            this.allPresets = allPresets;
        });

        this.filterForm = fb.group({
            presetName: fb.control("", Validators.required),
            selectedPreset: fb.control(""),
            selectedYear: fb.control(""),
            catFixed: fb.control(""),
            catOther: fb.control(""),
            catIncoming: fb.control(""),
            freqMonthly: fb.control(""),
            freqQuarter: fb.control(""),
            freqYearly: fb.control(""),
            displayTotal: fb.control("")
        });

        this.filterForm.controls["selectedPreset"].valueChanges.subscribe((preset) => {
            this.loadFilter(preset);
        });
    }

    private loadFilter(preset: FilterPreset) {
        if (preset) {
            this.displayParamService.filterPreset = FilterPreset.build(preset);
            this.displayParamService.hasChanged();
        }
    }

    notExistsCurrentFilter(): boolean {
        let actualKey: string = FilterPreset.getKey(this.displayParamService.filterPreset);
        return !this.allPresets.some(preset => {
            return FilterPreset.getKey(preset) === actualKey;
        });
    }

    onFilterUpdated() {
        this.displayParamService.hasChanged();
        this.filterForm.controls["selectedPreset"].setValue("");
    }

    onAskSave() {
        this.editPresetName = true;
    }

    onSavePreset() {
        this.editPresetName = false;
        if (this.filterForm.valid) {
            this.displayParamService.filterPreset.name = this.filterForm.controls["presetName"].value;
            this._filterPresetRestService.create(this.displayParamService.filterPreset).subscribe(filterPreset => {
                this.allPresets.push(filterPreset);
            });
        }
    }

    onCancelPreset() {
        this.editPresetName = false;
    }
}
