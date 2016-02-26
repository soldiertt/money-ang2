System.register(['angular2/core'], function(exports_1) {
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
    var MoneyIconDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MoneyIconDirective = (function () {
                function MoneyIconDirective() {
                }
                __decorate([
                    core_1.Input('icon-class'), 
                    __metadata('design:type', String)
                ], MoneyIconDirective.prototype, "iconClass", void 0);
                MoneyIconDirective = __decorate([
                    core_1.Component({
                        selector: 'money-icon',
                        template: "<span [ngClass]=\"['money-icon',iconClass.toLowerCase()]\"></span>",
                        styleUrls: ['css/money-icon.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], MoneyIconDirective);
                return MoneyIconDirective;
            })();
            exports_1("MoneyIconDirective", MoneyIconDirective);
        }
    }
});
