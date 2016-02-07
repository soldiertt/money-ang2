System.register(['angular2/core', 'angular2/router', './home/moneyhome.component', './admin/moneyadminhome.component', './admin/admincategory.component', './admin/admincsv.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, moneyhome_component_1, moneyadminhome_component_1, admincategory_component_1, admincsv_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (moneyhome_component_1_1) {
                moneyhome_component_1 = moneyhome_component_1_1;
            },
            function (moneyadminhome_component_1_1) {
                moneyadminhome_component_1 = moneyadminhome_component_1_1;
            },
            function (admincategory_component_1_1) {
                admincategory_component_1 = admincategory_component_1_1;
            },
            function (admincsv_component_1_1) {
                admincsv_component_1 = admincsv_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    router_1.RouteConfig([
                        new router_1.Route({ path: '/home', component: moneyhome_component_1.MoneyHomeComponent, name: 'Home', useAsDefault: true }),
                        new router_1.Route({ path: '/admin', component: moneyadminhome_component_1.MoneyAdminHomeComponent, name: 'AdminHome' }),
                        new router_1.Route({ path: '/admin/category', component: admincategory_component_1.AdminCategoryComponent, name: 'AdminCategory' }),
                        new router_1.Route({ path: '/admin/csv', component: admincsv_component_1.AdminCsvComponent, name: 'AdminCsv' })
                    ]),
                    core_1.Component({
                        selector: 'money-app',
                        templateUrl: 'app/view/money-app.html',
                        encapsulation: core_1.ViewEncapsulation.None,
                        styleUrls: ['app/view/css/master.css'],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
