import {Component, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Route, ROUTER_DIRECTIVES} from 'angular2/router'
import {MoneyHomeComponent} from './home/moneyhome.component';
import {MoneyAdminHomeComponent} from './admin/moneyadminhome.component';
import {AdminCategoryComponent} from './admin/admincategory.component';
import {AdminCsvComponent} from './admin/admincsv.component';

@RouteConfig([
new Route({path: '/home', component: MoneyHomeComponent, name: 'Home', useAsDefault: true}),
new Route({path: '/admin', component: MoneyAdminHomeComponent, name: 'AdminHome'}),
new Route({path: '/admin/category', component: AdminCategoryComponent, name: 'AdminCategory'}),
new Route({path: '/admin/csv', component: AdminCsvComponent, name: 'AdminCsv'})
])
@Component({
    selector: 'money-app',
    templateUrl: 'app/view/money-app.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['app/view/css/master.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class AppComponent {
}
