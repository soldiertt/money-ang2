System.register(["angular2/core", "angular2/http", "rxjs/add/operator/map"], function(exports_1, context_1) {
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
    var core_1, http_1;
    var AccountSettingRestService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            AccountSettingRestService = (function () {
                function AccountSettingRestService(_http) {
                    this._http = _http;
                }
                AccountSettingRestService.prototype.list = function () {
                    return this._http.get("/restapi/account-setting").map(function (res) { return res.json(); });
                };
                AccountSettingRestService.prototype.create = function (newAccountSetting) {
                    return this._http.post("/restapi/account-setting", JSON.stringify(newAccountSetting));
                };
                AccountSettingRestService.prototype.delete = function (accountSettingId) {
                    return this._http.delete("/restapi/account-setting/" + accountSettingId);
                };
                AccountSettingRestService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AccountSettingRestService);
                return AccountSettingRestService;
            }());
            exports_1("AccountSettingRestService", AccountSettingRestService);
        }
    }
});
//# sourceMappingURL=account-setting-rest.service.js.map