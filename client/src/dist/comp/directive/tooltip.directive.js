System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, TooltipDirective;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            TooltipDirective = (function () {
                function TooltipDirective(el) {
                    this.displayed = false;
                    this.displayLeft = false;
                }
                TooltipDirective.prototype.enable = function ($event) {
                    if (this.isActive === "true") {
                        if ($event.clientX - $event.offsetX + 450 > window.innerWidth) {
                            this.displayLeft = true;
                        }
                        else {
                            this.displayLeft = false;
                        }
                        if (this.displayed) {
                            this.displayed = false;
                        }
                        else {
                            this.displayed = true;
                        }
                    }
                    return false;
                };
                TooltipDirective.prototype.startAutoClose = function () {
                    var _this = this;
                    this.autoClose = setTimeout(function () { _this.displayed = false; }, 1000);
                };
                TooltipDirective.prototype.cancelAutoClose = function () {
                    clearTimeout(this.autoClose);
                };
                TooltipDirective.prototype.close = function () {
                    this.displayed = false;
                };
                return TooltipDirective;
            }());
            __decorate([
                core_1.HostListener("click", ["$event"]),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], TooltipDirective.prototype, "enable", null);
            __decorate([
                core_1.HostListener("mouseout"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], TooltipDirective.prototype, "startAutoClose", null);
            __decorate([
                core_1.HostListener("mouseover"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], TooltipDirective.prototype, "cancelAutoClose", null);
            __decorate([
                core_1.HostListener("blur"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], TooltipDirective.prototype, "close", null);
            TooltipDirective = __decorate([
                core_1.Directive({
                    selector: "[tooltip]",
                    inputs: ["isActive : tooltip"],
                    host: { "[class.moneytooltip]": "isActive == 'true'", "[class.showtooltip]": "displayed", "[class.displayleft]": "displayLeft", "[tabindex]": "1" }
                }),
                __metadata("design:paramtypes", [core_1.ElementRef])
            ], TooltipDirective);
            exports_1("TooltipDirective", TooltipDirective);
        }
    };
});
//# sourceMappingURL=tooltip.directive.js.map