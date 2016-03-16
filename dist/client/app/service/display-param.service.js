System.register(['angular2/core'], function(exports_1, context_1) {
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
    var DisplayParamService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DisplayParamService = (function () {
                function DisplayParamService() {
                    this._types = ["FIXED", "OTHER", "INCOMING"];
                    this._frequencies = ["MONTHLY", "QUARTER", "YEARLY"];
                    this.showTotals = true;
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
                Object.defineProperty(DisplayParamService.prototype, "types", {
                    get: function () {
                        return this._types;
                    },
                    set: function (types) {
                        this._types = types;
                        this.filtersUpdated.emit("types");
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DisplayParamService.prototype, "frequencies", {
                    get: function () {
                        return this._frequencies;
                    },
                    set: function (frequencies) {
                        this._frequencies = frequencies;
                        this.filtersUpdated.emit("frequencies");
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
