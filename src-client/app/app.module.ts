import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, RequestOptions }    from '@angular/http';
import { environment } from './environments/environment';

import { AppComponent }         from './comp/app.component';
import { HomeComponent }         from './comp/home/home.component';

import { routing }              from './app.routing';
import {AdminAccountSettingComponent} from "./comp/admin-account-setting/admin-account-setting.component";
import {AdminCategoryComponent} from "./comp/admin-category/admin-category.component";
import {AdminMenuComponent} from "./comp/admin-menu/admin-menu.component";
import {AdminPresetComponent} from "./comp/admin-preset/admin-preset.component";
import {AdminRuleComponent} from "./comp/admin-rule/admin-rule.component";
import {AdminUploadsComponent} from "./comp/admin-uploads/admin-uploads.component";
import {MoneyTableComponent} from "./comp/home/money-table.component";
import {TableFilterFormComponent} from "./comp/home/table-filter-form.component";
import {TxDetailsComponent} from "./comp/home/tx-details.component";
import {AutoImportComponent} from "./comp/import/auto-import.component";
import {ImportComponent} from "./comp/import/import.component";
import {PreferencesComponent} from "./comp/preferences/preferences.component";
import {CategorySorterPipe, PeriodFilterPipe, CatfilterPipe} from "./pipe/money-pipes";
import {AccountSettingRestService} from "./service/account-setting-rest.service";
import {CategoryRestService} from "./service/category-rest.service";
import {CsvFilesRestService} from "./service/csv-files-rest.service";
import {DisplayParamService} from "./service/display-param.service";
import {FilterPresetRestService} from "./service/filter-preset-rest.service";
import {FormUtilsService} from "./service/form-utils.service";
import {PreferenceRestService} from "./service/preference-rest.service";
import {RuleService} from "./service/rule.service";
import {RuleRestService} from "./service/rule-rest.service";
import {TxrefRestService} from "./service/txref-rest.service";
import {UploadCsvService} from "./service/upload-csv.service";
import {JsonRequestOptions} from "./model/config/json-request-options";
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {DisplayErrorDirective} from "./comp/directive/display-error.directive";
import {FocusOnInitDirective} from "./comp/directive/focus-on-init.directive";
import {MoneyIconDirective} from "./comp/directive/money-icon.directive";
import {TooltipDirective} from "./comp/directive/tooltip.directive";
import {CategoryYearsChecker} from "./model/utils/category-years-checker";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {SecretComponent} from "./comp/secret/secret.component";
import {AuthenticationService} from "./service/authentication.service";
import {CanActivateViaAuthGuard} from "./service/can-activate-auth.gard";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        SecretComponent,
        AdminAccountSettingComponent,
        AdminCategoryComponent,
        AdminMenuComponent,
        AdminPresetComponent,
        AdminRuleComponent,
        AdminUploadsComponent,
        HomeComponent,
        MoneyTableComponent,
        TableFilterFormComponent,
        TxDetailsComponent,
        AutoImportComponent,
        ImportComponent,
        PreferencesComponent,
        CategorySorterPipe,
        PeriodFilterPipe,
        CatfilterPipe,
        DisplayErrorDirective,
        FocusOnInitDirective,
        MoneyIconDirective,
        TooltipDirective
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue : "/"},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: 'webApiBaseUrl', useValue: environment.webApiBaseUrl},
        {provide: RequestOptions, useClass: JsonRequestOptions},
        CookieService,
        AuthenticationService,
        CanActivateViaAuthGuard,
        AccountSettingRestService,
        CategoryRestService,
        CsvFilesRestService,
        DisplayParamService,
        FilterPresetRestService,
        FormUtilsService,
        PreferenceRestService,
        RuleService,
        RuleRestService,
        TxrefRestService,
        UploadCsvService,
        CategoryYearsChecker
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}





