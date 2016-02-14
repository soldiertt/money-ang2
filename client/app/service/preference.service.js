System.register(['angular2/core', 'rxjs/add/operator/map', './preference-rest.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, preference_rest_service_1;
    var PreferenceService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {},
            function (preference_rest_service_1_1) {
                preference_rest_service_1 = preference_rest_service_1_1;
            }],
        execute: function() {
            PreferenceService = (function () {
                function PreferenceService(_preferenceRestService) {
                    this._preferenceRestService = _preferenceRestService;
                }
                PreferenceService.prototype.getPref = function (prefName) {
                    return this._preferenceRestService.list().map(function (res) {
                        var prefList = res.json();
                        if (prefList.length > 0) {
                            var preference = prefList[0];
                            var foundKeys = Object.keys(preference).filter(function (key) { return key === prefName; });
                            if (foundKeys.length > 0) {
                                return preference[foundKeys[0]];
                            }
                        }
                        return undefined;
                    });
                };
                PreferenceService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [preference_rest_service_1.PreferenceRestService])
                ], PreferenceService);
                return PreferenceService;
            })();
            exports_1("PreferenceService", PreferenceService);
        }
    }
});
