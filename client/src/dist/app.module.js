System.register(["@angular/core", "@angular/platform-browser", "@angular/forms", "@angular/http", "./environments/environment", "./comp/app.component", "./comp/home/home.component", "./app.routing", "./comp/admin/admin-account-setting.component", "./comp/admin/admin-category.component", "./comp/admin/admin-menu.component", "./comp/admin/admin-preset.component", "./comp/admin/admin-rule.component", "./comp/admin/admin-uploads.component", "./comp/home/money-table.component", "./comp/home/table-filter-form.component", "./comp/home/tx-details.component", "./comp/import/auto-import.component", "./comp/import/import.component", "./comp/preferences/preferences.component", "./pipe/money-pipes", "./service/account-setting-rest.service", "./service/category-rest.service", "./service/csv-files-rest.service", "./service/display-param.service", "./service/filter-preset-rest.service", "./service/form-utils.service", "./service/preference-rest.service", "./service/rule.service", "./service/rule-rest.service", "./service/txref-rest.service", "./service/upload-csv.service", "./model/config/json-request-options", "@angular/common", "./comp/directive/display-error.directive", "./comp/directive/focus-on-init.directive", "./comp/directive/money-icon.directive", "./comp/directive/tooltip.directive", "./model/utils/category-years-checker", "angular2-cookie/services/cookies.service", "./comp/secret.component", "./service/authentication.service", "./service/can-activate-auth.gard"], function (exports_1, context_1) {
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
    var core_1, platform_browser_1, forms_1, http_1, environment_1, app_component_1, home_component_1, app_routing_1, admin_account_setting_component_1, admin_category_component_1, admin_menu_component_1, admin_preset_component_1, admin_rule_component_1, admin_uploads_component_1, money_table_component_1, table_filter_form_component_1, tx_details_component_1, auto_import_component_1, import_component_1, preferences_component_1, money_pipes_1, account_setting_rest_service_1, category_rest_service_1, csv_files_rest_service_1, display_param_service_1, filter_preset_rest_service_1, form_utils_service_1, preference_rest_service_1, rule_service_1, rule_rest_service_1, txref_rest_service_1, upload_csv_service_1, json_request_options_1, common_1, display_error_directive_1, focus_on_init_directive_1, money_icon_directive_1, tooltip_directive_1, category_years_checker_1, cookies_service_1, secret_component_1, authentication_service_1, can_activate_auth_gard_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (environment_1_1) {
                environment_1 = environment_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (admin_account_setting_component_1_1) {
                admin_account_setting_component_1 = admin_account_setting_component_1_1;
            },
            function (admin_category_component_1_1) {
                admin_category_component_1 = admin_category_component_1_1;
            },
            function (admin_menu_component_1_1) {
                admin_menu_component_1 = admin_menu_component_1_1;
            },
            function (admin_preset_component_1_1) {
                admin_preset_component_1 = admin_preset_component_1_1;
            },
            function (admin_rule_component_1_1) {
                admin_rule_component_1 = admin_rule_component_1_1;
            },
            function (admin_uploads_component_1_1) {
                admin_uploads_component_1 = admin_uploads_component_1_1;
            },
            function (money_table_component_1_1) {
                money_table_component_1 = money_table_component_1_1;
            },
            function (table_filter_form_component_1_1) {
                table_filter_form_component_1 = table_filter_form_component_1_1;
            },
            function (tx_details_component_1_1) {
                tx_details_component_1 = tx_details_component_1_1;
            },
            function (auto_import_component_1_1) {
                auto_import_component_1 = auto_import_component_1_1;
            },
            function (import_component_1_1) {
                import_component_1 = import_component_1_1;
            },
            function (preferences_component_1_1) {
                preferences_component_1 = preferences_component_1_1;
            },
            function (money_pipes_1_1) {
                money_pipes_1 = money_pipes_1_1;
            },
            function (account_setting_rest_service_1_1) {
                account_setting_rest_service_1 = account_setting_rest_service_1_1;
            },
            function (category_rest_service_1_1) {
                category_rest_service_1 = category_rest_service_1_1;
            },
            function (csv_files_rest_service_1_1) {
                csv_files_rest_service_1 = csv_files_rest_service_1_1;
            },
            function (display_param_service_1_1) {
                display_param_service_1 = display_param_service_1_1;
            },
            function (filter_preset_rest_service_1_1) {
                filter_preset_rest_service_1 = filter_preset_rest_service_1_1;
            },
            function (form_utils_service_1_1) {
                form_utils_service_1 = form_utils_service_1_1;
            },
            function (preference_rest_service_1_1) {
                preference_rest_service_1 = preference_rest_service_1_1;
            },
            function (rule_service_1_1) {
                rule_service_1 = rule_service_1_1;
            },
            function (rule_rest_service_1_1) {
                rule_rest_service_1 = rule_rest_service_1_1;
            },
            function (txref_rest_service_1_1) {
                txref_rest_service_1 = txref_rest_service_1_1;
            },
            function (upload_csv_service_1_1) {
                upload_csv_service_1 = upload_csv_service_1_1;
            },
            function (json_request_options_1_1) {
                json_request_options_1 = json_request_options_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (display_error_directive_1_1) {
                display_error_directive_1 = display_error_directive_1_1;
            },
            function (focus_on_init_directive_1_1) {
                focus_on_init_directive_1 = focus_on_init_directive_1_1;
            },
            function (money_icon_directive_1_1) {
                money_icon_directive_1 = money_icon_directive_1_1;
            },
            function (tooltip_directive_1_1) {
                tooltip_directive_1 = tooltip_directive_1_1;
            },
            function (category_years_checker_1_1) {
                category_years_checker_1 = category_years_checker_1_1;
            },
            function (cookies_service_1_1) {
                cookies_service_1 = cookies_service_1_1;
            },
            function (secret_component_1_1) {
                secret_component_1 = secret_component_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (can_activate_auth_gard_1_1) {
                can_activate_auth_gard_1 = can_activate_auth_gard_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule,
                        forms_1.ReactiveFormsModule,
                        http_1.HttpModule,
                        app_routing_1.routing
                    ],
                    declarations: [
                        app_component_1.AppComponent,
                        secret_component_1.SecretComponent,
                        admin_account_setting_component_1.AdminAccountSettingComponent,
                        admin_category_component_1.AdminCategoryComponent,
                        admin_menu_component_1.AdminMenuComponent,
                        admin_preset_component_1.AdminPresetComponent,
                        admin_rule_component_1.AdminRuleComponent,
                        admin_uploads_component_1.AdminUploadsComponent,
                        home_component_1.HomeComponent,
                        money_table_component_1.MoneyTableComponent,
                        table_filter_form_component_1.TableFilterFormComponent,
                        tx_details_component_1.TxDetailsComponent,
                        auto_import_component_1.AutoImportComponent,
                        import_component_1.ImportComponent,
                        preferences_component_1.PreferencesComponent,
                        money_pipes_1.CategorySorterPipe,
                        money_pipes_1.PeriodFilterPipe,
                        money_pipes_1.CatfilterPipe,
                        display_error_directive_1.DisplayErrorDirective,
                        focus_on_init_directive_1.FocusOnInitDirective,
                        money_icon_directive_1.MoneyIconDirective,
                        tooltip_directive_1.TooltipDirective
                    ],
                    providers: [
                        { provide: common_1.APP_BASE_HREF, useValue: "/" },
                        { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                        { provide: 'webApiBaseUrl', useValue: environment_1.environment.webApiBaseUrl },
                        { provide: http_1.RequestOptions, useClass: json_request_options_1.JsonRequestOptions },
                        cookies_service_1.CookieService,
                        authentication_service_1.AuthenticationService,
                        can_activate_auth_gard_1.CanActivateViaAuthGuard,
                        account_setting_rest_service_1.AccountSettingRestService,
                        category_rest_service_1.CategoryRestService,
                        csv_files_rest_service_1.CsvFilesRestService,
                        display_param_service_1.DisplayParamService,
                        filter_preset_rest_service_1.FilterPresetRestService,
                        form_utils_service_1.FormUtilsService,
                        preference_rest_service_1.PreferenceRestService,
                        rule_service_1.RuleService,
                        rule_rest_service_1.RuleRestService,
                        txref_rest_service_1.TxrefRestService,
                        upload_csv_service_1.UploadCsvService,
                        category_years_checker_1.CategoryYearsChecker
                    ],
                    bootstrap: [app_component_1.AppComponent]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map