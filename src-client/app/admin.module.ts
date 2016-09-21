/**
 * Created by soldi on 19-09-16.
 */
import {NgModule} from "@angular/core";
import {AdminAccountSettingComponent} from "./comp/admin-account-setting/admin-account-setting.component";
import {AdminCategoryComponent} from "./comp/admin-category/admin-category.component";
import {AdminMenuComponent} from "./comp/admin-menu/admin-menu.component";
import {AdminPresetComponent} from "./comp/admin-preset/admin-preset.component";
import {AdminRuleComponent} from "./comp/admin-rule/admin-rule.component";
import {AdminUploadsComponent} from "./comp/admin-uploads/admin-uploads.component";
import {UploadCsvService} from "./service/upload-csv.service";
import {CategoryYearsChecker} from "./model/utils/category-years-checker";
import {SharedModule} from "./shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        AdminAccountSettingComponent,
        AdminCategoryComponent,
        AdminMenuComponent,
        AdminPresetComponent,
        AdminRuleComponent,
        AdminUploadsComponent
    ],
    providers: [
        UploadCsvService,
        CategoryYearsChecker
    ]
})
export class AdminModule { }