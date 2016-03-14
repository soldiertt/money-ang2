System.register(['angular2/core', '../core/category.class'], function(exports_1, context_1) {
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
    var core_1, category_class_1;
    var CategoryYearsChecker;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (category_class_1_1) {
                category_class_1 = category_class_1_1;
            }],
        execute: function() {
            CategoryYearsChecker = (function () {
                function CategoryYearsChecker() {
                }
                CategoryYearsChecker.prototype.removedYears = function (oldYears, newYears) {
                    return oldYears.filter(function (oldYear) { return newYears.indexOf(oldYear) == -1; });
                };
                CategoryYearsChecker.prototype.addedYears = function (oldYears, newYears) {
                    return newYears.filter(function (newYear) { return oldYears.indexOf(newYear) == -1; });
                };
                CategoryYearsChecker.prototype.addMissingPeriods = function (category, addedYears) {
                    addedYears.forEach(function (addedYear) {
                        for (var i = 0; i < category.nbPeriods; i++) {
                            category.periods.push(new category_class_1.Period(addedYear, i));
                        }
                    });
                    return category;
                };
                CategoryYearsChecker.prototype.removedOldPeriods = function (category, removedYears) {
                    category.periods = category.periods.filter(function (period) { return removedYears.indexOf(period.year) == -1; });
                    return category;
                };
                CategoryYearsChecker = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CategoryYearsChecker);
                return CategoryYearsChecker;
            }());
            exports_1("CategoryYearsChecker", CategoryYearsChecker);
        }
    }
});
