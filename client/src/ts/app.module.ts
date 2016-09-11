import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule, RequestOptions }    from '@angular/http';
import { environment } from './environments/environment';

import { AppComponent }         from './comp/app.component';
import { HomeComponent }         from './comp/home/home.component';

import { routing }              from './app.routing';
import {AdminAccountSettingComponent} from "./comp/admin/admin-account-setting.component";
import {AdminCategoryComponent} from "./comp/admin/admin-category.component";
import {AdminMenuComponent} from "./comp/admin/admin-menu.component";
import {AdminPresetComponent} from "./comp/admin/admin-preset.component";
import {AdminRuleComponent} from "./comp/admin/admin-rule.component";
import {AdminUploadsComponent} from "./comp/admin/admin-uploads.component";
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





