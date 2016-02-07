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
    var FormUtilsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            FormUtilsService = (function () {
                function FormUtilsService() {
                }
                FormUtilsService.prototype.reset = function (form) {
                    var controlNames = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        controlNames[_i - 1] = arguments[_i];
                    }
                    for (var _a = 0; _a < controlNames.length; _a++) {
                        var controlName = controlNames[_a];
                        form.controls[controlName].updateValue('');
                    }
                };
                FormUtilsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], FormUtilsService);
                return FormUtilsService;
            })();
            exports_1("FormUtilsService", FormUtilsService);
        }
    }
});
