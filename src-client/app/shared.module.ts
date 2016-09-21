import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {RouterModule} from "@angular/router";
import {CategorySorterPipe, PeriodFilterPipe, CatfilterPipe} from "./pipe/money-pipes";
import {DisplayErrorDirective} from "./comp/directive/display-error.directive";
import {FocusOnInitDirective} from "./comp/directive/focus-on-init.directive";

@NgModule({
    imports:      [
        CommonModule
    ],
    declarations: [
        DisplayErrorDirective,
        FocusOnInitDirective,
        CategorySorterPipe,
        PeriodFilterPipe,
        CatfilterPipe
    ],
    exports:      [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        DisplayErrorDirective,
        FocusOnInitDirective,
        CategorySorterPipe,
        PeriodFilterPipe,
        CatfilterPipe
    ]
})
export class SharedModule { }