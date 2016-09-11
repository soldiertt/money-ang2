System.register(['@angular/router', "./comp/home/home.component", "./comp/import/import.component", "./comp/import/auto-import.component", "./comp/preferences/preferences.component", "./comp/admin/admin-category.component", "./comp/admin/admin-rule.component", "./comp/admin/admin-account-setting.component", "./comp/admin/admin-uploads.component", "./comp/admin/admin-preset.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, home_component_1, import_component_1, auto_import_component_1, preferences_component_1, admin_category_component_1, admin_rule_component_1, admin_account_setting_component_1, admin_uploads_component_1, admin_preset_component_1;
    var appRoutes, routing;
    return {
        setters:[
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
            appRoutes = [
                { path: "", component: home_component_1.HomeComponent, pathMatch: 'full' },
                { path: "import", component: import_component_1.ImportComponent, pathMatch: 'full' },
                { path: "auto-import", component: auto_import_component_1.AutoImportComponent, pathMatch: 'full' },
                { path: "uploads", component: admin_uploads_component_1.AdminUploadsComponent, pathMatch: 'full' },
                { path: "preferences", component: preferences_component_1.PreferencesComponent, pathMatch: 'full' },
                { path: "admin-category", component: admin_category_component_1.AdminCategoryComponent, pathMatch: 'full' },
                { path: "admin-account-setting", component: admin_account_setting_component_1.AdminAccountSettingComponent, pathMatch: 'full' },
                { path: "admin-rule", component: admin_rule_component_1.AdminRuleComponent, pathMatch: 'full' },
                { path: "admin-preset", component: admin_preset_component_1.AdminPresetComponent, pathMatch: 'full' }
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
//# sourceMappingURL=app.routing.js.map