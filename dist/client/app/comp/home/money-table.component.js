System.register(["angular2/core", "./tx-details.component", "../../model/core/money-enums", "../../service/display-param.service", "../../service/category-rest.service", "../../service/form-utils.service", "../directive/tooltip.directive", "../directive/money-icon.directive", "../../pipe/money-pipes"], function(exports_1, context_1) {
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
    var core_1, tx_details_component_1, money_enums_1, display_param_service_1, category_rest_service_1, form_utils_service_1, tooltip_directive_1, money_icon_directive_1, money_pipes_1;
    var MoneyTableComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tx_details_component_1_1) {
                tx_details_component_1 = tx_details_component_1_1;
            },
            function (money_enums_1_1) {
                money_enums_1 = money_enums_1_1;
            },
            function (display_param_service_1_1) {
                display_param_service_1 = display_param_service_1_1;
            },
            function (category_rest_service_1_1) {
                category_rest_service_1 = category_rest_service_1_1;
            },
            function (form_utils_service_1_1) {
                form_utils_service_1 = form_utils_service_1_1;
            },
            function (tooltip_directive_1_1) {
                tooltip_directive_1 = tooltip_directive_1_1;
            },
            function (money_icon_directive_1_1) {
                money_icon_directive_1 = money_icon_directive_1_1;
            },
            function (money_pipes_1_1) {
                money_pipes_1 = money_pipes_1_1;
            }],
        execute: function() {
            MoneyTableComponent = (function () {
                function MoneyTableComponent(displayParamService, _categoryRestService, _formUtilsService) {
                    var _this = this;
                    this.displayParamService = displayParamService;
                    this._categoryRestService = _categoryRestService;
                    this._formUtilsService = _formUtilsService;
                    this.categories = [];
                    this.totals = new Map();
                    this.months = this._formUtilsService.getAppMonths();
                    this.displayParamService.filtersUpdated.subscribe(function (item) { return _this.filtersUpdated(item); });
                    this.displayCategories();
                }
                MoneyTableComponent.prototype.displayCategories = function () {
                    var _this = this;
                    this.initTotals(false);
                    this._categoryRestService.listForYear(this.displayParamService.year).subscribe(function (categories) {
                        _this.categories = categories;
                        _this.computeTotals();
                    });
                };
                /**
                  We subscribe to filtersUpdated event of displayParamService
                **/
                MoneyTableComponent.prototype.filtersUpdated = function (item) {
                    if (item === "year") {
                        // full reload
                        this.displayCategories();
                    }
                    else {
                        this.initTotals(true);
                        this.computeSubTotals();
                    }
                };
                /** When cell is clicked **/
                MoneyTableComponent.prototype.findTx = function (categoryId, period) {
                    if (period.total !== 0 && !period.txList) {
                        this._categoryRestService.findAllTxForPeriod(categoryId, period.id).subscribe(function (categ) {
                            period.txList = categ.periods[0].txList;
                        });
                    }
                };
                MoneyTableComponent.prototype.markPeriodAsPaid = function (category, period) {
                    if (this.isUnpaidPeriod(category, period)) {
                        period.markAsPaid = true;
                        this._categoryRestService.updatePeriodMarkAsPaid(category.id, period.id, true).subscribe(function (data) {
                            console.log("category updated");
                        }, function (err) { return console.log(err); });
                    }
                    else if (period.total === 0 && period.markAsPaid) {
                        period.markAsPaid = false;
                        this._categoryRestService.updatePeriodMarkAsPaid(category.id, period.id, false).subscribe(function (data) {
                            console.log("category updated");
                        }, function (err) { return console.log(err); });
                    }
                };
                /** list on event txDeleted of money-tx-details component **/
                MoneyTableComponent.prototype.onTxDeleted = function ($event) {
                    var period = $event[0], tx = $event[1];
                    period.txList = undefined;
                    period.total = period.total - tx.amount;
                    this.initTotals(false);
                    this.computeTotals();
                };
                /** for css class **/
                MoneyTableComponent.prototype.isCurrentPeriod = function (categ, period) {
                    var actualdate = new Date();
                    var actualYear = actualdate.getFullYear();
                    if (categ.frequency === money_enums_1.CatFrequency.YEARLY) {
                        return period.year === actualYear;
                    }
                    else if (categ.frequency === money_enums_1.CatFrequency.QUARTER) {
                        return period.year === actualYear && period.index === (Math.floor((actualdate.getMonth() + 3) / 3) - 1);
                    }
                    else if (categ.frequency === money_enums_1.CatFrequency.MONTHLY) {
                        return period.year === actualYear && period.index === actualdate.getMonth();
                    }
                };
                /** for css class **/
                MoneyTableComponent.prototype.isUnpaidPeriod = function (categ, period) {
                    if (categ.type === money_enums_1.CatType.FIXED && period.total === 0 && !period.markAsPaid) {
                        var actualdate = new Date();
                        var actualYear = actualdate.getFullYear();
                        if (period.year < actualYear) {
                            return true;
                        }
                        else if (categ.frequency === money_enums_1.CatFrequency.YEARLY) {
                            return false;
                        }
                        else if (categ.frequency === money_enums_1.CatFrequency.QUARTER) {
                            return period.index < (Math.floor((actualdate.getMonth() + 3) / 3) - 1);
                        }
                        else if (categ.frequency === money_enums_1.CatFrequency.MONTHLY) {
                            return period.index <= actualdate.getMonth();
                        }
                    }
                    else {
                        return false;
                    }
                };
                MoneyTableComponent.prototype.initTotals = function (onlySubTotals) {
                    for (var _i = 0, _a = ["FIXED", "OTHER", "INCOMING"]; _i < _a.length; _i++) {
                        var type = _a[_i];
                        if (!onlySubTotals) {
                            for (var _b = 0, _c = ["MONTHLY", "QUARTER", "YEARLY"]; _b < _c.length; _b++) {
                                var freq = _c[_b];
                                this.totals.set(type + "-" + freq, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                            }
                        }
                        this.totals.set(type, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                    }
                    this.totals.set("GLOBAL", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                };
                MoneyTableComponent.prototype.computeTotals = function () {
                    var _this = this;
                    this.categories.forEach(function (categ) {
                        // FILTER ON YEAR periods
                        var filteredPeriods = categ.periods.filter(function (period) { return period.year === _this.displayParamService.year; });
                        // MONTHLY
                        if (categ.frequency === money_enums_1.CatFrequency.MONTHLY) {
                            for (var periodIndex = 0; periodIndex < categ.nbPeriods; periodIndex++) {
                                // ** TYPE-FREQUENCY totals **
                                _this.totals.get(categ.type + "-" + categ.frequency)[periodIndex] += filteredPeriods[periodIndex].total;
                            }
                        }
                        else if (categ.frequency === money_enums_1.CatFrequency.QUARTER) {
                            for (var periodIndex = 0; periodIndex < categ.nbPeriods; periodIndex++) {
                                for (var i = 0; i < 3; i++) {
                                    // ** TYPE-FREQUENCY totals **
                                    _this.totals.get(categ.type + "-" + categ.frequency)[(periodIndex * 3) + i] += filteredPeriods[periodIndex].total / 3;
                                }
                            }
                        }
                        else if (categ.frequency === money_enums_1.CatFrequency.YEARLY) {
                            for (var i = 0; i < 12; i++) {
                                // ** TYPE-FREQUENCY totals **
                                _this.totals.get(categ.type + "-" + categ.frequency)[i] += filteredPeriods[0].total / 12;
                            }
                        }
                    });
                    this.computeSubTotals();
                };
                MoneyTableComponent.prototype.computeSubTotals = function () {
                    for (var _i = 0, _a = this.displayParamService.types; _i < _a.length; _i++) {
                        var type = _a[_i];
                        for (var _b = 0, _c = this.displayParamService.frequencies; _b < _c.length; _b++) {
                            var freq = _c[_b];
                            for (var i = 0; i < 12; i++) {
                                this.totals.get(type)[i] += this.totals.get(type + "-" + freq)[i];
                                this.totals.get("GLOBAL")[i] += this.totals.get(type + "-" + freq)[i];
                            }
                        }
                    }
                };
                MoneyTableComponent = __decorate([
                    core_1.Component({
                        selector: "money-table",
                        templateUrl: "html/home/money-table.html",
                        styleUrls: ["css/money-table.css", "css/tooltip.css"],
                        directives: [tooltip_directive_1.TooltipDirective, tx_details_component_1.TxDetailsComponent, money_icon_directive_1.MoneyIconDirective],
                        pipes: [money_pipes_1.CatfilterPipe, money_pipes_1.CategorySorterPipe, money_pipes_1.PeriodFilterPipe],
                        encapsulation: core_1.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [display_param_service_1.DisplayParamService, category_rest_service_1.CategoryRestService, form_utils_service_1.FormUtilsService])
                ], MoneyTableComponent);
                return MoneyTableComponent;
            }());
            exports_1("MoneyTableComponent", MoneyTableComponent);
        }
    }
});
//# sourceMappingURL=money-table.component.js.map