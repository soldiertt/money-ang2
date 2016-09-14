System.register(['@angular/router', "./comp/home/home.component", "./comp/import/import.component", "./comp/import/auto-import.component", "./comp/preferences/preferences.component", "./comp/admin/admin-category.component", "./comp/admin/admin-rule.component", "./comp/admin/admin-account-setting.component", "./comp/admin/admin-uploads.component", "./comp/admin/admin-preset.component", "./comp/secret.component", "./service/can-activate-auth.gard"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, home_component_1, import_component_1, auto_import_component_1, preferences_component_1, admin_category_component_1, admin_rule_component_1, admin_account_setting_component_1, admin_uploads_component_1, admin_preset_component_1, secret_component_1, can_activate_auth_gard_1;
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
            },
            function (secret_component_1_1) {
                secret_component_1 = secret_component_1_1;
            },
            function (can_activate_auth_gard_1_1) {
                can_activate_auth_gard_1 = can_activate_auth_gard_1_1;
            }],
        execute: function() {
            appRoutes = [
                { path: "", component: home_component_1.HomeComponent, pathMatch: 'full', canActivate: [can_activate_auth_gard_1.CanActivateViaAuthGuard] },
                { path: "import", component: import_component_1.ImportComponent, pathMatch: 'full', canActivate: [can_activate_auth_gard_1.CanActivateViaAuthGuard] },
                { path: "auto-import", component: auto_import_component_1.AutoImportComponent, pathMatch: 'full', canActivate: [can_activate_auth_gard_1.CanActivateViaAuthGuard] },
                { path: "uploads", component: admin_uploads_component_1.AdminUploadsComponent, pathMatch: 'full', canActivate: [can_activate_auth_gard_1.CanActivateViaAuthGuard] },
                { path: "preferences", component: preferences_component_1.PreferencesComponent, pathMatch: 'full', canActivate: [can_activate_auth_gard_1.CanActivateViaAuthGuard] },
                { path: "admin-category", component: admin_category_component_1.AdminCategoryComponent, pathMatch: 'full', canActivate: [can_activate_auth_gard_1.CanActivateViaAuthGuard] },
                { path: "admin-account-setting", component: admin_account_setting_component_1.AdminAccountSettingComponent, pathMatch: 'full', canActivate: [can_activate_auth_gard_1.CanActivateViaAuthGuard] },
                { path: "admin-rule", component: admin_rule_component_1.AdminRuleComponent, pathMatch: 'full', canActivate: [can_activate_auth_gard_1.CanActivateViaAuthGuard] },
                { path: "admin-preset", component: admin_preset_component_1.AdminPresetComponent, pathMatch: 'full', canActivate: [can_activate_auth_gard_1.CanActivateViaAuthGuard] },
                { path: "passPage", component: secret_component_1.SecretComponent, pathMatch: 'full' }
            ];
            exports_1("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
//# sourceMappingURL=app.routing.js.map