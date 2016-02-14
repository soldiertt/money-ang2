import {provide} from 'angular2/core'
import {ROUTER_PROVIDERS, ROUTER_PRIMARY_COMPONENT, APP_BASE_HREF} from 'angular2/router'
import {HTTP_PROVIDERS, RequestOptions} from 'angular2/http'
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './comp/app.component'
import {DisplayParamService} from './service/display-param.service'
import {CategoryRestService} from './service/category-rest.service'
import {AccountSettingRestService} from './service/account-setting-rest.service'
import {PreferenceRestService} from './service/preference-rest.service'
import {TxRestService} from './service/tx-rest.service'
import {CsvReaderRestService} from './service/csv-reader-rest.service'
import {FormUtilsService} from './service/form-utils.service'
import {JsonRequestOptions} from './config/json-request-options'


bootstrap(AppComponent, [
  DisplayParamService,
  CategoryRestService,
  AccountSettingRestService,
  PreferenceRestService,
  TxRestService,
  CsvReaderRestService,
  FormUtilsService,
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
  provide(APP_BASE_HREF, {useValue : '/'}),
  provide(RequestOptions, {useClass: JsonRequestOptions})
]);
