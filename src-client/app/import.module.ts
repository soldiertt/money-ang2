import { NgModule }      from '@angular/core';
import {AutoImportComponent} from "./comp/import/auto-import.component";
import {ImportComponent} from "./comp/import/import.component";
import {PreferencesComponent} from "./comp/preferences/preferences.component";
import {SharedModule} from "./shared.module";

@NgModule({
    imports:      [
        SharedModule
    ],
    declarations: [
        AutoImportComponent,
        ImportComponent,
        PreferencesComponent
    ],
    exports:      [
    ],
    providers: [
    ]
})
export class ImportModule { }
