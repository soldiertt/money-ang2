System.register(['angular2/core', '../../service/display-param.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, display_param_service_1;
    var TableFilterFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (display_param_service_1_1) {
                display_param_service_1 = display_param_service_1_1;
            }],
        execute: function() {
            TableFilterFormComponent = (function () {
                function TableFilterFormComponent(displayParamService) {
                    this.displayParamService = displayParamService;
                    this.catTypeFixed = true;
                    this.catTypeOther = true;
                    this.catFreqMonthly = true;
                    this.catFreqQuarter = true;
                    this.catFreqYearly = true;
                }
                TableFilterFormComponent.prototype.onFilterUpdated = function ($event) {
                    var types = [];
                    var frequencies = [];
                    if (this.catTypeFixed) {
                        types.push("FIXED");
                    }
                    if (this.catTypeOther) {
                        types.push("OTHER");
                    }
                    if (this.catFreqMonthly) {
                        frequencies.push("MONTHLY");
                    }
                    if (this.catFreqQuarter) {
                        frequencies.push("QUARTER");
                    }
                    if (this.catFreqYearly) {
                        frequencies.push("YEARLY");
                    }
                    this.displayParamService.types = types;
                    this.displayParamService.frequencies = frequencies;
                };
                TableFilterFormComponent = __decorate([
                    core_1.Component({
                        selector: 'money-table-filter-form',
                        templateUrl: 'html/home/table-filter-form.html'
                    }), 
                    __metadata('design:paramtypes', [display_param_service_1.DisplayParamService])
                ], TableFilterFormComponent);
                return TableFilterFormComponent;
            })();
            exports_1("TableFilterFormComponent", TableFilterFormComponent);
        }
    }
});
