System.register(["@angular/core", "../../model/core/preference.class", "../../service/preference-rest.service"], function(exports_1, context_1) {
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
    var core_1, preference_class_1, preference_rest_service_1;
    var PreferencesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (preference_class_1_1) {
                preference_class_1 = preference_class_1_1;
            },
            function (preference_rest_service_1_1) {
                preference_rest_service_1 = preference_rest_service_1_1;
            }],
        execute: function() {
            PreferencesComponent = (function () {
                function PreferencesComponent(_preferenceRestService) {
                    this._preferenceRestService = _preferenceRestService;
                    this.preference = new preference_class_1.Preference();
                }
                PreferencesComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._preferenceRestService.list().subscribe(function (data) {
                        var prefList = data.json();
                        if (prefList.length > 0) {
                            _this.preference = prefList[0];
                        }
                        else {
                            _this.preference = new preference_class_1.Preference();
                        }
                    });
                };
                PreferencesComponent.prototype.onSave = function () {
                    var _this = this;
                    if (this.preference.id) {
                        this._preferenceRestService.update(this.preference).subscribe(function (response) {
                            _this.preference = response.json();
                            console.log("Preferences were updated");
                        });
                    }
                    else {
                        this._preferenceRestService.create(this.preference).subscribe(function (response) {
                            _this.preference = response.json();
                            console.log("Preferences were saved");
                        });
                    }
                };
                PreferencesComponent = __decorate([
                    core_1.Component({
                        selector: "money-preferences",
                        templateUrl: "assets/html/preferences/index.html"
                    }), 
                    __metadata('design:paramtypes', [preference_rest_service_1.PreferenceRestService])
                ], PreferencesComponent);
                return PreferencesComponent;
            }());
            exports_1("PreferencesComponent", PreferencesComponent);
        }
    }
});
//# sourceMappingURL=preferences.component.js.map