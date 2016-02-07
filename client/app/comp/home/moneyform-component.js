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
    var MoneyFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (display_param_service_1_1) {
                display_param_service_1 = display_param_service_1_1;
            }],
        execute: function() {
            MoneyFormComponent = (function () {
                function MoneyFormComponent(displayParamService) {
                    this.displayParamService = displayParamService;
                    this._catTypeFixed = true;
                    this._catTypeOther = true;
                    this._catFreqMonthly = true;
                    this._catFreqQuarter = true;
                    this._catFreqYearly = true;
                }
                Object.defineProperty(MoneyFormComponent.prototype, "catTypeFixed", {
                    /* GETTERS */
                    get: function () {
                        return this._catTypeFixed;
                    },
                    /* SETTERS */
                    set: function (value) {
                        this._catTypeFixed = value;
                        this.onSubmit();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MoneyFormComponent.prototype, "catTypeOther", {
                    get: function () {
                        return this._catTypeOther;
                    },
                    set: function (value) {
                        this._catTypeOther = value;
                        this.onSubmit();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MoneyFormComponent.prototype, "catFreqMonthly", {
                    get: function () {
                        return this._catFreqMonthly;
                    },
                    set: function (value) {
                        this._catFreqMonthly = value;
                        this.onSubmit();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MoneyFormComponent.prototype, "catFreqQuarter", {
                    get: function () {
                        return this._catFreqQuarter;
                    },
                    set: function (value) {
                        this._catFreqQuarter = value;
                        this.onSubmit();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(MoneyFormComponent.prototype, "catFreqYearly", {
                    get: function () {
                        return this._catFreqYearly;
                    },
                    set: function (value) {
                        this._catFreqYearly = value;
                        this.onSubmit();
                    },
                    enumerable: true,
                    configurable: true
                });
                MoneyFormComponent.prototype.onSubmit = function () {
                    var types = [];
                    var frequencies = [];
                    if (this.catTypeFixed) {
                        types.push("fixed");
                    }
                    if (this.catTypeOther) {
                        types.push("other");
                    }
                    if (this.catFreqMonthly) {
                        frequencies.push("monthly");
                    }
                    if (this.catFreqQuarter) {
                        frequencies.push("quarter");
                    }
                    if (this.catFreqYearly) {
                        frequencies.push("yearly");
                    }
                    this.displayParamService.types = types;
                    this.displayParamService.frequencies = frequencies;
                };
                MoneyFormComponent = __decorate([
                    core_1.Component({
                        selector: 'money-form',
                        templateUrl: 'app/view/home/money-form.html'
                    }), 
                    __metadata('design:paramtypes', [display_param_service_1.DisplayParamService])
                ], MoneyFormComponent);
                return MoneyFormComponent;
            })();
            exports_1("MoneyFormComponent", MoneyFormComponent);
        }
    }
});
