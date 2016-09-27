import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }         from './comp/app.component';
import { routing }              from './app.routing';
import {AdminModule} from "./admin.module";
import {HomeModule} from "./home.module";
import {ImportModule} from "./import.module";
import {SecurityModule} from "./security.module";
import {CoreModule} from "./core.module";
import {RequestOptions} from "@angular/http";
import {JsonRequestOptions} from "./model/config/json-request-options";

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        AdminModule,
        HomeModule,
        ImportModule,
        SecurityModule,
        routing
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {provide: RequestOptions, useClass: JsonRequestOptions}
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}





