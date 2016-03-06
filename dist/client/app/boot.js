System.register(['angular2/core', 'angular2/router', 'angular2/http', 'angular2/platform/browser', './comp/app.component', './service/display-param.service', './service/category-rest.service', './service/account-setting-rest.service', './service/preference-rest.service', './service/txref-rest.service', './service/rule-rest.service', './service/csv-reader-rest.service', './service/form-utils.service', './model/utils/category-years-checker', './model/config/json-request-options'], function(exports_1) {
    var core_1, router_1, http_1, browser_1, app_component_1, display_param_service_1, category_rest_service_1, account_setting_rest_service_1, preference_rest_service_1, txref_rest_service_1, rule_rest_service_1, csv_reader_rest_service_1, form_utils_service_1, category_years_checker_1, json_request_options_1;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (display_param_service_1_1) {
                display_param_service_1 = display_param_service_1_1;
            },
            function (category_rest_service_1_1) {
                category_rest_service_1 = category_rest_service_1_1;
            },
            function (account_setting_rest_service_1_1) {
                account_setting_rest_service_1 = account_setting_rest_service_1_1;
            },
            function (preference_rest_service_1_1) {
                preference_rest_service_1 = preference_rest_service_1_1;
            },
            function (txref_rest_service_1_1) {
                txref_rest_service_1 = txref_rest_service_1_1;
            },
            function (rule_rest_service_1_1) {
                rule_rest_service_1 = rule_rest_service_1_1;
            },
            function (csv_reader_rest_service_1_1) {
                csv_reader_rest_service_1 = csv_reader_rest_service_1_1;
            },
            function (form_utils_service_1_1) {
                form_utils_service_1 = form_utils_service_1_1;
            },
            function (category_years_checker_1_1) {
                category_years_checker_1 = category_years_checker_1_1;
            },
            function (json_request_options_1_1) {
                json_request_options_1 = json_request_options_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [
                display_param_service_1.DisplayParamService,
                category_rest_service_1.CategoryRestService,
                account_setting_rest_service_1.AccountSettingRestService,
                preference_rest_service_1.PreferenceRestService,
                txref_rest_service_1.TxrefRestService,
                rule_rest_service_1.RuleRestService,
                csv_reader_rest_service_1.CsvReaderRestService,
                form_utils_service_1.FormUtilsService,
                category_years_checker_1.CategoryYearsChecker,
                router_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: app_component_1.AppComponent }),
                core_1.provide(router_1.APP_BASE_HREF, { useValue: '/' }),
                core_1.provide(http_1.RequestOptions, { useClass: json_request_options_1.JsonRequestOptions })
            ]);
        }
    }
});
