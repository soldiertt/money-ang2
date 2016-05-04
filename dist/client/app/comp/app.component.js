System.register(["@angular/core", "@angular/router", "./home/home.component", "./import/import.component", "./import/auto-import.component", "./preferences/preferences.component", "./admin/admin-category.component", "./admin/admin-rule.component", "./admin/admin-account-setting.component", "./admin/admin-uploads.component", "./admin/admin-preset.component"], function(exports_1, context_1) {
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
    var core_1, router_1, home_component_1, import_component_1, auto_import_component_1, preferences_component_1, admin_category_component_1, admin_rule_component_1, admin_account_setting_component_1, admin_uploads_component_1, admin_preset_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (import_component_1_1) {
                import_component_1 = import_component_1_1;
            },
            function (auto_import_component_1_1) {
                auto_import_component_1 = auto_import_component_1_1;
            },
            function (preferences_component_1_1) {
                preferences_component_1 = preferences_component_1_1;
            },
            function (admin_category_component_1_1) {
                admin_category_component_1 = admin_category_component_1_1;
            },
            function (admin_rule_component_1_1) {
                admin_rule_component_1 = admin_rule_component_1_1;
            },
            function (admin_account_setting_component_1_1) {
                admin_account_setting_component_1 = admin_account_setting_component_1_1;
            },
            function (admin_uploads_component_1_1) {
                admin_uploads_component_1 = admin_uploads_component_1_1;
            },
            function (admin_preset_component_1_1) {
                admin_preset_component_1 = admin_preset_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    router_1.Routes([
                        { path: "/home", component: home_component_1.HomeComponent },
                        { path: "/import", component: import_component_1.ImportComponent },
                        { path: "/auto-import", component: auto_import_component_1.AutoImportComponent },
                        { path: "/uploads", component: admin_uploads_component_1.AdminUploadsComponent },
                        { path: "/preferences", component: preferences_component_1.PreferencesComponent },
                        { path: "/admin-category", component: admin_category_component_1.AdminCategoryComponent },
                        { path: "/admin-account-setting", component: admin_account_setting_component_1.AdminAccountSettingComponent },
                        { path: "/admin-rule", component: admin_rule_component_1.AdminRuleComponent },
                        { path: "/admin-preset", component: admin_preset_component_1.AdminPresetComponent }
                    ]),
                    core_1.Component({
                        selector: "money-app",
                        templateUrl: "html/index.html",
                        encapsulation: core_1.ViewEncapsulation.None,
                        styleUrls: ["css/master.css"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map