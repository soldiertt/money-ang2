System.register(["@angular/core"], function(exports_1, context_1) {
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
    var AdminMenuComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AdminMenuComponent = (function () {
                function AdminMenuComponent() {
                }
                AdminMenuComponent.prototype.isCurrent = function (item) {
                    return item === this.current;
                };
                __decorate([
                    core_1.Input("current"), 
                    __metadata('design:type', String)
                ], AdminMenuComponent.prototype, "current", void 0);
                AdminMenuComponent = __decorate([
                    core_1.Component({
                        selector: "money-admin-menu",
                        templateUrl: "assets/html/admin/leftmenu.html",
                        styleUrls: ["assets/css/admin/menu.css"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AdminMenuComponent);
                return AdminMenuComponent;
            }());
            exports_1("AdminMenuComponent", AdminMenuComponent);
        }
    }
});
//# sourceMappingURL=admin-menu.component.js.map