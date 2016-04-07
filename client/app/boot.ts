 ///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import {provide} from 'angular2/core'
import {ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from 'angular2/router'
import {HTTP_PROVIDERS, RequestOptions} from 'angular2/http'
import {bootstrap}                  from 'angular2/platform/browser'
import {AppComponent}               from './comp/app.component'
import {DisplayParamService}        from './service/display-param.service'
import {CategoryRestService}        from './service/category-rest.service'
import {AccountSettingRestService}  from './service/account-setting-rest.service'
import {PreferenceRestService}      from './service/preference-rest.service'
import {TxrefRestService}           from './service/txref-rest.service'
import {RuleRestService}            from './service/rule-rest.service'
import {RuleService}                from './service/rule.service'
import {CsvFilesRestService}        from './service/csv-files-rest.service'
import {FilterPresetRestService}    from './service/filter-preset-rest.service'
import {FormUtilsService}           from './service/form-utils.service'
import {UploadCsvService}           from './service/upload-csv.service'
import {CategoryYearsChecker}       from './model/utils/category-years-checker'
import {JsonRequestOptions}         from './model/config/json-request-options'


bootstrap(AppComponent, [
  DisplayParamService,
  CategoryRestService,
  AccountSettingRestService,
  PreferenceRestService,
  TxrefRestService,
  RuleRestService,
  RuleService,
  CsvFilesRestService,
  FilterPresetRestService,
  FormUtilsService,
  UploadCsvService,
  CategoryYearsChecker,
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
  provide(APP_BASE_HREF, {useValue : '/'}),
  provide(RequestOptions, {useClass: JsonRequestOptions}),
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
