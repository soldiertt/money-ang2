System.register(["@angular/core", "@angular/forms", "../../model/core/filter-preset.class", "../../service/display-param.service", "../../service/form-utils.service", "../../service/filter-preset-rest.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, forms_1, filter_preset_class_1, display_param_service_1, form_utils_service_1, filter_preset_rest_service_1, TableFilterFormComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (filter_preset_class_1_1) {
                filter_preset_class_1 = filter_preset_class_1_1;
            },
            function (display_param_service_1_1) {
                display_param_service_1 = display_param_service_1_1;
            },
            function (form_utils_service_1_1) {
                form_utils_service_1 = form_utils_service_1_1;
            },
            function (filter_preset_rest_service_1_1) {
                filter_preset_rest_service_1 = filter_preset_rest_service_1_1;
            }
        ],
        execute: function () {
            TableFilterFormComponent = (function () {
                function TableFilterFormComponent(displayParamService, formUtilsService, fb, _filterPresetRestService) {
                    var _this = this;
                    this.displayParamService = displayParamService;
                    this.formUtilsService = formUtilsService;
                    this._filterPresetRestService = _filterPresetRestService;
                    this.allPresets = [];
                    this.allYears = this.formUtilsService.getAppYears();
                    this._filterPresetRestService.list().subscribe(function (allPresets) {
                        _this.allPresets = allPresets;
                    });
                    this.presetNameCtrl = fb.control("", forms_1.Validators.required);
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
                    this.filterForm.controls["selectedPreset"].valueChanges.subscribe(function (presetId) {
                        _this.loadFilter(presetId);
                    });
                }
                TableFilterFormComponent.prototype.loadFilter = function (presetId) {
                    if (presetId !== "") {
                        var selectedFilter = this.allPresets.filter(function (elem) { return elem.id === presetId; })[0];
                        this.displayParamService.filterPreset = filter_preset_class_1.FilterPreset.build(selectedFilter);
                        this.displayParamService.hasChanged();
                    }
                };
                TableFilterFormComponent.prototype.notExistsCurrentFilter = function () {
                    var actualKey = filter_preset_class_1.FilterPreset.getKey(this.displayParamService.filterPreset);
                    return !this.allPresets.some(function (preset) { return filter_preset_class_1.FilterPreset.getKey(preset) === actualKey; });
                };
                TableFilterFormComponent.prototype.onFilterUpdated = function ($event) {
                    this.displayParamService.hasChanged();
                    this.selectedPresetCtrl.setValue("");
                };
                TableFilterFormComponent.prototype.onAskSave = function () {
                    this.editPresetName = true;
                };
                TableFilterFormComponent.prototype.onSavePreset = function () {
                    var _this = this;
                    this.editPresetName = false;
                    if (this.filterForm.valid) {
                        this.displayParamService.filterPreset.name = this.presetNameCtrl.value;
                        this._filterPresetRestService.create(this.displayParamService.filterPreset).subscribe(function (filterPreset) {
                            _this.allPresets.push(filterPreset);
                        });
                    }
                };
                TableFilterFormComponent.prototype.onCancelPreset = function () {
                    this.editPresetName = false;
                };
                return TableFilterFormComponent;
            }());
            TableFilterFormComponent = __decorate([
                core_1.Component({
                    selector: "money-table-filter-form",
                    templateUrl: "assets/html/home/table-filter-form.html",
                    styleUrls: ["assets/css/table-filter-form.css"]
                }),
                __metadata("design:paramtypes", [display_param_service_1.DisplayParamService,
                    form_utils_service_1.FormUtilsService, forms_1.FormBuilder,
                    filter_preset_rest_service_1.FilterPresetRestService])
            ], TableFilterFormComponent);
            exports_1("TableFilterFormComponent", TableFilterFormComponent);
        }
    };
});
//# sourceMappingURL=table-filter-form.component.js.map