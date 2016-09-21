import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }         from './comp/app.component';
import { routing }              from './app.routing';
import {AdminModule} from "./admin.module";
import {HomeModule} from "./home.module";
import {ImportModule} from "./import.module";
import {SecurityModule} from "./security.module";
import {CoreModule} from "./core.module";


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

    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}





