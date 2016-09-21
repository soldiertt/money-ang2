/**
 * Created by soldi on 21-09-16.
 */
import { NgModule }      from '@angular/core';
import {CookieService} from "angular2-cookie/services/cookies.service";
import {SecretComponent} from "./comp/secret/secret.component";
import {AuthenticationService} from "./service/authentication.service";
import {CanActivateViaAuthGuard} from "./service/can-activate-auth.gard";
import {SharedModule} from "./shared.module";

@NgModule({
    imports:      [
        SharedModule
    ],
    declarations: [
        SecretComponent
    ],
    exports:      [
    ],
    providers: [
        CookieService,
        AuthenticationService,
        CanActivateViaAuthGuard
    ]
})
export class SecurityModule { }