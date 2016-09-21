import { NgModule }      from '@angular/core';
import { HomeComponent }         from './comp/home/home.component';
import {MoneyTableComponent} from "./comp/home/money-table.component";
import {TableFilterFormComponent} from "./comp/home/table-filter-form.component";
import {TxDetailsComponent} from "./comp/home/tx-details.component";
import {DisplayParamService} from "./service/display-param.service";
import {MoneyIconDirective} from "./comp/directive/money-icon.directive";
import {TooltipDirective} from "./comp/directive/tooltip.directive";
import {SharedModule} from "./shared.module";

@NgModule({
    imports:      [
        SharedModule
    ],
    declarations: [
        HomeComponent,
        MoneyTableComponent,
        TableFilterFormComponent,
        TxDetailsComponent,
        MoneyIconDirective,
        TooltipDirective
    ],
    exports:      [
    ],
    providers: [
        DisplayParamService
    ]
})
export class HomeModule { }




