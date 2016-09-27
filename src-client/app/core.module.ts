/**
 * Created by soldi on 19-09-16.
 */
import { NgModule }      from '@angular/core';
import {CommonModule, APP_BASE_HREF, HashLocationStrategy, LocationStrategy}      from '@angular/common';
import { environment } from './environments/environment';
import {AccountSettingRestService} from "./service/account-setting-rest.service";
import {CategoryRestService} from "./service/category-rest.service";
import {CsvFilesRestService} from "./service/csv-files-rest.service";
import {FilterPresetRestService} from "./service/filter-preset-rest.service";
import {FormUtilsService} from "./service/form-utils.service";
import {PreferenceRestService} from "./service/preference-rest.service";
import {RuleService} from "./service/rule.service";
import {RuleRestService} from "./service/rule-rest.service";
import {TxrefRestService} from "./service/txref-rest.service";

@NgModule({
    imports:      [
        CommonModule
    ],
    declarations: [
    ],
    exports:      [
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue : "/"},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: 'webApiBaseUrl', useValue: environment.webApiBaseUrl},
        AccountSettingRestService,
        CategoryRestService,
        CsvFilesRestService,
        FilterPresetRestService,
        FormUtilsService,
        PreferenceRestService,
        RuleService,
        RuleRestService,
        TxrefRestService
    ]
})
export class CoreModule { }