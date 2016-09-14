/**
 * Created by soldi on 13-09-16.
 */
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService) {}

    canActivate() {
        return this.authenticationService.isAuthenticated();
    }
}