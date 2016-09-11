import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent}                from "./comp/home/home.component";
import {ImportComponent}              from "./comp/import/import.component";
import {AutoImportComponent}          from "./comp/import/auto-import.component";
import {PreferencesComponent}         from "./comp/preferences/preferences.component";
import {AdminCategoryComponent}       from "./comp/admin/admin-category.component";
import {AdminRuleComponent}           from "./comp/admin/admin-rule.component";
import {AdminAccountSettingComponent} from "./comp/admin/admin-account-setting.component";
import {AdminUploadsComponent}        from "./comp/admin/admin-uploads.component";
import {AdminPresetComponent}         from "./comp/admin/admin-preset.component";

const appRoutes: Routes = [
    {path: "", component: HomeComponent, pathMatch: 'full'},
    {path: "import", component: ImportComponent, pathMatch: 'full'},
    {path: "auto-import", component: AutoImportComponent, pathMatch: 'full'},
    {path: "uploads", component: AdminUploadsComponent, pathMatch: 'full'},
    {path: "preferences", component: PreferencesComponent, pathMatch: 'full'},
    {path: "admin-category", component: AdminCategoryComponent, pathMatch: 'full'},
    {path: "admin-account-setting", component: AdminAccountSettingComponent, pathMatch: 'full'},
    {path: "admin-rule", component: AdminRuleComponent, pathMatch: 'full'},
    {path: "admin-preset", component: AdminPresetComponent, pathMatch: 'full'}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
