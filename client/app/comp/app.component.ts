import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Route, ROUTER_DIRECTIVES} from 'angular2/router'
import {HomeComponent} from './home/home.component';
import {AdminCategoryComponent} from './admin/admin-category.component';
import {AdminAccountSettingComponent} from './admin/admin-account-setting.component';

@RouteConfig([
new Route({path: '/home', component: HomeComponent, name: 'Home', useAsDefault: true}),
new Route({path: '/admin/category', component: AdminCategoryComponent, name: 'AdminCategory'}),
new Route({path: '/admin/account-setting', component: AdminAccountSettingComponent, name: 'AdminAccountSetting'})
])
@Component({
    selector: 'money-app',
    templateUrl: 'app/view/index.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['app/view/css/master.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
}
