import {Injectable} from "@angular/core";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Injectable()
export class AuthenticationService {

    privateKey: string = "privateKey";
    secretValue: string = "toto";

    constructor(private cookieService: CookieService) {

    }

    authenticate(secretText: string) {
        if (this.checkSecret(secretText)) {
            this.saveToCookie();
        }
    }

    isAuthenticated() {
        let secret = this.getFromCookie();
        return this.checkSecret(secret);
    }

    private checkSecret(secretText: string) : boolean {
        return (secretText === this.secretValue);
    }

    private saveToCookie(): void {
        this.cookieService.put(this.privateKey, this.secretValue);
    }

    private getFromCookie(): string {
        return this.cookieService.get(this.privateKey);
    }


}