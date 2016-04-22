System.register(["angular2/core"], function(exports_1, context_1) {
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
    var core_1;
    var CategorySorterPipe, PeriodFilterPipe, CatfilterPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CategorySorterPipe = (function () {
                function CategorySorterPipe() {
                }
                CategorySorterPipe.prototype.transform = function (array, args) {
                    if (array) {
                        array.sort(function (a, b) {
                            if (a.type > b.type) {
                                return 1;
                            }
                            else if (a.type < b.type) {
                                return -1;
                            }
                            else {
                                // they have same type, check the frequency
                                if (a.frequency > b.frequency) {
                                    return 1;
                                }
                                else if (a.frequency < b.frequency) {
                                    return -1;
                                }
                                else {
                                    // they have same frequency, check the name
                                    if (a.name > b.name) {
                                        return 1;
                                    }
                                    else if (a.name < b.name) {
                                        return -1;
                                    }
                                    else {
                                        return 0;
                                    }
                                }
                            }
                        });
                    }
                    return array;
                };
                CategorySorterPipe = __decorate([
                    core_1.Pipe({
                        name: "categorySorter"
                    }), 
                    __metadata('design:paramtypes', [])
                ], CategorySorterPipe);
                return CategorySorterPipe;
            }());
            exports_1("CategorySorterPipe", CategorySorterPipe);
            PeriodFilterPipe = (function () {
                function PeriodFilterPipe() {
                }
                PeriodFilterPipe.prototype.transform = function (periods, args) {
                    if (periods) {
                        var year_1 = args[0];
                        return periods.filter(function (period) { return period.year === year_1; });
                    }
                    else {
                        return periods;
                    }
                };
                PeriodFilterPipe = __decorate([
                    core_1.Pipe({
                        name: "periodFilter"
                    }), 
                    __metadata('design:paramtypes', [])
                ], PeriodFilterPipe);
                return PeriodFilterPipe;
            }());
            exports_1("PeriodFilterPipe", PeriodFilterPipe);
            CatfilterPipe = (function () {
                function CatfilterPipe() {
                }
                CatfilterPipe.prototype.transform = function (categories, args) {
                    if (categories) {
                        var types_1 = args[0], frequencies_1 = args[1], years_1 = args[2];
                        var filtered = categories.filter(function (item) { return types_1.indexOf(item.type) !== -1 && frequencies_1.indexOf(item.frequency) !== -1; });
                        if (years_1) {
                            filtered = filtered.filter(function (item) { return years_1.every(function (year) { return item.years.indexOf(year) !== -1; }); });
                        }
                        return filtered;
                    }
                    else {
                        return categories;
                    }
                };
                CatfilterPipe = __decorate([
                    core_1.Pipe({
                        name: "catfilter"
                    }), 
                    __metadata('design:paramtypes', [])
                ], CatfilterPipe);
                return CatfilterPipe;
            }());
            exports_1("CatfilterPipe", CatfilterPipe);
        }
    }
});
//# sourceMappingURL=money-pipes.js.map