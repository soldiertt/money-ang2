import {Component, ViewEncapsulation} from "angular2/core";
import {RouteConfig, Route} from "angular2/router";
import {HomeComponent}                from "./home/home.component";
import {ImportComponent}              from "./import/import.component";
import {AutoImportComponent}          from "./import/auto-import.component";
import {PreferencesComponent}         from "./preferences/preferences.component";
import {AdminCategoryComponent}       from "./admin/admin-category.component";
import {AdminRuleComponent}           from "./admin/admin-rule.component";
import {AdminAccountSettingComponent} from "./admin/admin-account-setting.component";
import {AdminUploadsComponent}        from "./admin/admin-uploads.component";
import {AdminPresetComponent}         from "./admin/admin-preset.component";

@RouteConfig([
new Route({path: "/home", component: HomeComponent, name: "Home", useAsDefault: true}),
new Route({path: "/import", component: ImportComponent, name: "Import"}),
new Route({path: "/auto-import", component: AutoImportComponent, name: "AutoImport"}),
new Route({path: "/uploads", component: AdminUploadsComponent, name: "Uploads"}),
new Route({path: "/preferences", component: PreferencesComponent, name: "Preferences"}),
new Route({path: "/admin-category", component: AdminCategoryComponent, name: "AdminCategory"}),
new Route({path: "/admin-account-setting", component: AdminAccountSettingComponent, name: "AdminAccountSetting"}),
new Route({path: "/admin-rule", component: AdminRuleComponent, name: "AdminRule"}),
new Route({path: "/admin-preset", component: AdminPresetComponent, name: "AdminPreset"})
])
@Component({
    selector: "money-app",
    templateUrl: "html/index.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["css/master.css"]
})
export class AppComponent {
}
