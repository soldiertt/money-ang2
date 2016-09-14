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
import {SecretComponent} from "./comp/secret.component";
import {CanActivateViaAuthGuard} from "./service/can-activate-auth.gard";

const appRoutes: Routes = [
    {path: "", component: HomeComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
    {path: "import", component: ImportComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
    {path: "auto-import", component: AutoImportComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
    {path: "uploads", component: AdminUploadsComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
    {path: "preferences", component: PreferencesComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
    {path: "admin-category", component: AdminCategoryComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
    {path: "admin-account-setting", component: AdminAccountSettingComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
    {path: "admin-rule", component: AdminRuleComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
    {path: "admin-preset", component: AdminPresetComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
    {path: "passPage", component: SecretComponent, pathMatch: 'full'}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
