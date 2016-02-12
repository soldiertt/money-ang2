System.register(['angular2/core', 'angular2/http'], function(exports_1) {
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
    var PreferenceRestService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            PreferenceRestService = (function () {
                function PreferenceRestService(_http) {
                    this._http = _http;
                }
                PreferenceRestService.prototype.list = function () {
                    return this._http.get('/restapi/preference');
                };
                PreferenceRestService.prototype.create = function (newPreference) {
                    return this._http.post('/restapi/preference', JSON.stringify(newPreference));
                };
                PreferenceRestService.prototype.delete = function (preferenceId) {
                    return this._http.delete('/restapi/preference/' + preferenceId);
                };
                PreferenceRestService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], PreferenceRestService);
                return PreferenceRestService;
            })();
            exports_1("PreferenceRestService", PreferenceRestService);
        }
    }
});
