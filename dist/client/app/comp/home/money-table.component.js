System.register(['angular2/core', './tx-details.component', "../../model/core/money-enums", '../../service/display-param.service', '../../service/category-rest.service', '../../service/preference-rest.service', '../../service/form-utils.service', '../directive/tooltip.directive', '../../pipe/money-pipes'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, tx_details_component_1, money_enums_1, display_param_service_1, category_rest_service_1, preference_rest_service_1, form_utils_service_1, tooltip_directive_1, money_pipes_1;
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
            function (preference_rest_service_1_1) {
                preference_rest_service_1 = preference_rest_service_1_1;
            },
            function (form_utils_service_1_1) {
                form_utils_service_1 = form_utils_service_1_1;
            },
            function (tooltip_directive_1_1) {
                tooltip_directive_1 = tooltip_directive_1_1;
            },
            function (money_pipes_1_1) {
                money_pipes_1 = money_pipes_1_1;
            }],
        execute: function() {
            MoneyTableComponent = (function () {
                function MoneyTableComponent(displayParamService, _categoryRestService, _prefRestService, _formUtilsService) {
                    var _this = this;
                    this.displayParamService = displayParamService;
                    this._categoryRestService = _categoryRestService;
                    this._prefRestService = _prefRestService;
                    this._formUtilsService = _formUtilsService;
                    this.categories = [];
                    this.months = this._formUtilsService.getAppMonths();
                    this._prefRestService.getPref().subscribe(function (preference) {
                        _this.workingYear = preference.workingYear;
                        _categoryRestService.listForYear(_this.workingYear).subscribe(function (categories) {
                            _this.categories = categories;
                        });
                    });
                }
                MoneyTableComponent.prototype.findTx = function (categoryId, period) {
                    if (!period.txList) {
                        this._categoryRestService.findAllTxForPeriod(categoryId, period.id).subscribe(function (categ) {
                            period.txList = categ.periods[0].txList;
                        });
                    }
                };
                MoneyTableComponent.prototype.isCurrentPeriod = function (categ, period) {
                    var actualdate = new Date();
                    var actualYear = actualdate.getFullYear();
                    if (categ.frequency == money_enums_1.CatFrequency.YEARLY) {
                        return period.year == actualYear;
                    }
                    else if (categ.frequency == money_enums_1.CatFrequency.QUARTER) {
                        return period.index == (Math.floor((actualdate.getMonth() + 3) / 3) - 1);
                    }
                    else if (categ.frequency == money_enums_1.CatFrequency.MONTHLY) {
                        return period.index == actualdate.getMonth();
                    }
                };
                MoneyTableComponent = __decorate([
                    core_1.Component({
                        selector: 'money-table',
                        templateUrl: 'html/home/money-table.html',
                        styleUrls: ['css/tooltip.css'],
                        directives: [tooltip_directive_1.TooltipDirective, tx_details_component_1.TxDetailsComponent],
                        pipes: [money_pipes_1.CatfilterPipe, money_pipes_1.CategorySorterPipe, money_pipes_1.PeriodFilterPipe],
                        encapsulation: core_1.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [display_param_service_1.DisplayParamService, category_rest_service_1.CategoryRestService, preference_rest_service_1.PreferenceRestService, form_utils_service_1.FormUtilsService])
                ], MoneyTableComponent);
                return MoneyTableComponent;
            })();
            exports_1("MoneyTableComponent", MoneyTableComponent);
        }
    }
});
