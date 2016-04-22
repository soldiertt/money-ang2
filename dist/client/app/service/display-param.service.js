System.register(["angular2/core", "../model/core/filter-preset.class"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, filter_preset_class_1;
    var DisplayParamService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (filter_preset_class_1_1) {
                filter_preset_class_1 = filter_preset_class_1_1;
            }],
        execute: function() {
            DisplayParamService = (function () {
                function DisplayParamService() {
                    this.filterPreset = new filter_preset_class_1.FilterPreset();
                    this.filtersUpdated = new core_1.EventEmitter();
                    this._year = (new Date()).getFullYear();
                }
                Object.defineProperty(DisplayParamService.prototype, "year", {
                    get: function () {
                        return this._year;
                    },
                    set: function (year) {
                        this._year = year;
                        this.filtersUpdated.emit("year");
                    },
                    enumerable: true,
                    configurable: true
                });
                DisplayParamService.prototype.hasChanged = function () {
                    this.filtersUpdated.emit("update");
                };
                Object.defineProperty(DisplayParamService.prototype, "types", {
                    get: function () {
                        var types = [];
                        if (this.filterPreset.catTypeFixed) {
                            types.push("FIXED");
                        }
                        if (this.filterPreset.catTypeOther) {
                            types.push("OTHER");
                        }
                        if (this.filterPreset.catTypeIncoming) {
                            types.push("INCOMING");
                        }
                        return types;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayParamService.prototype, "frequencies", {
                    get: function () {
                        var frequencies = [];
                        if (this.filterPreset.catFreqMonthly) {
                            frequencies.push("MONTHLY");
                        }
                        if (this.filterPreset.catFreqQuarter) {
                            frequencies.push("QUARTER");
                        }
                        if (this.filterPreset.catFreqYearly) {
                            frequencies.push("YEARLY");
                        }
                        return frequencies;
                    },
                    enumerable: true,
                    configurable: true
                });
                DisplayParamService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DisplayParamService);
                return DisplayParamService;
            }());
            exports_1("DisplayParamService", DisplayParamService);
        }
    }
});
//# sourceMappingURL=display-param.service.js.map