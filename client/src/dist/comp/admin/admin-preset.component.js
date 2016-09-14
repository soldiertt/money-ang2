System.register(["@angular/core", "@angular/forms", "../../service/filter-preset-rest.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, filter_preset_rest_service_1, AdminPresetComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (filter_preset_rest_service_1_1) {
                filter_preset_rest_service_1 = filter_preset_rest_service_1_1;
            }
        ],
        execute: function () {
            AdminPresetComponent = (function () {
                function AdminPresetComponent(_filterPresetRestService, fb) {
                    var _this = this;
                    this._filterPresetRestService = _filterPresetRestService;
                    this.filterPresets = [];
                    this._filterPresetRestService.list().subscribe(function (allPresets) {
                        _this.filterPresets = allPresets;
                    });
                    this.editForm = fb.group({
                        presetName: fb.control("", forms_1.Validators.required)
                    });
                }
                AdminPresetComponent.prototype.onDelete = function (preset, index) {
                    var _this = this;
                    this._filterPresetRestService.delete(preset.id).subscribe(function (resp) {
                        console.log("Preset delete");
                        _this.filterPresets.splice(index, 1);
                    }, function (err) { return console.log(err); });
                };
                AdminPresetComponent.prototype.onEdit = function (preset) {
                    this.editedPreset = preset;
                };
                AdminPresetComponent.prototype.onCancelEdit = function ($event) {
                    $event.preventDefault();
                    this.editedPreset = undefined;
                };
                AdminPresetComponent.prototype.onUpdate = function () {
                    var _this = this;
                    if (this.editedPreset) {
                        this._filterPresetRestService.update(this.editedPreset).subscribe(function (preset) {
                            console.log("Preset updated");
                            _this.editedPreset = undefined;
                        });
                    }
                };
                return AdminPresetComponent;
            }());
            AdminPresetComponent = __decorate([
                core_1.Component({
                    selector: "money-admin-preset",
                    templateUrl: "assets/html/admin/preset.html"
                }),
                __metadata("design:paramtypes", [filter_preset_rest_service_1.FilterPresetRestService, forms_1.FormBuilder])
            ], AdminPresetComponent);
            exports_1("AdminPresetComponent", AdminPresetComponent);
        }
    };
});
//# sourceMappingURL=admin-preset.component.js.map