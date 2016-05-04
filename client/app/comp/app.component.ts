import {Component, ViewEncapsulation} from "@angular/core";
import {Routes} from "@angular/router";

import {HomeComponent}                from "./home/home.component";
import {ImportComponent}              from "./import/import.component";
import {AutoImportComponent}          from "./import/auto-import.component";
import {PreferencesComponent}         from "./preferences/preferences.component";
import {AdminCategoryComponent}       from "./admin/admin-category.component";
import {AdminRuleComponent}           from "./admin/admin-rule.component";
import {AdminAccountSettingComponent} from "./admin/admin-account-setting.component";
import {AdminUploadsComponent}        from "./admin/admin-uploads.component";
import {AdminPresetComponent}         from "./admin/admin-preset.component";

@Routes([
  {path: "/home", component: HomeComponent},
  {path: "/import", component: ImportComponent},
  {path: "/auto-import", component: AutoImportComponent},
  {path: "/uploads", component: AdminUploadsComponent},
  {path: "/preferences", component: PreferencesComponent},
  {path: "/admin-category", component: AdminCategoryComponent},
  {path: "/admin-account-setting", component: AdminAccountSettingComponent},
  {path: "/admin-rule", component: AdminRuleComponent},
  {path: "/admin-preset", component: AdminPresetComponent}
])
@Component({
    selector: "money-app",
    templateUrl: "html/index.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["css/master.css"]
})
export class AppComponent {
}
