System.register(['angular2/core', '../../service/display-param.service', '../../service/category-rest.service', '../../service/preference-rest.service', '../../pipe/catfilter-pipe', '../../pipe/category-sorter-pipe', '../../pipe/period-filter-pipe'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, display_param_service_1, category_rest_service_1, preference_rest_service_1, catfilter_pipe_1, category_sorter_pipe_1, period_filter_pipe_1;
    var MoneyTableComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
            function (catfilter_pipe_1_1) {
                catfilter_pipe_1 = catfilter_pipe_1_1;
            },
            function (category_sorter_pipe_1_1) {
                category_sorter_pipe_1 = category_sorter_pipe_1_1;
            },
            function (period_filter_pipe_1_1) {
                period_filter_pipe_1 = period_filter_pipe_1_1;
            }],
        execute: function() {
            MoneyTableComponent = (function () {
                function MoneyTableComponent(displayParamService, _categoryRestService, _prefRestService) {
                    var _this = this;
                    this.displayParamService = displayParamService;
                    this._categoryRestService = _categoryRestService;
                    this._prefRestService = _prefRestService;
                    this.months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
                    this.categories = [];
                    this._prefRestService.getPref().subscribe(function (preference) {
                        _this.workingYear = preference.workingYear;
                        _categoryRestService.listForYear(_this.workingYear).subscribe(function (categories) {
                            _this.categories = categories;
                        });
                    });
                }
                MoneyTableComponent = __decorate([
                    core_1.Component({
                        selector: 'money-table',
                        templateUrl: 'app/view/home/money-table.html',
                        pipes: [catfilter_pipe_1.CatfilterPipe, category_sorter_pipe_1.CategorySorterPipe, period_filter_pipe_1.PeriodFilterPipe]
                    }), 
                    __metadata('design:paramtypes', [display_param_service_1.DisplayParamService, category_rest_service_1.CategoryRestService, preference_rest_service_1.PreferenceRestService])
                ], MoneyTableComponent);
                return MoneyTableComponent;
            })();
            exports_1("MoneyTableComponent", MoneyTableComponent);
        }
    }
});
