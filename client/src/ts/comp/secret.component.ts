import {Component} from "@angular/core";
import {AuthenticationService} from "../service/authentication.service";

@Component({
    selector: "money-secret",
    templateUrl: "assets/html/secret.html",
    styleUrls: ["assets/css/secret.css"]
})
export class SecretComponent {

    secretText: string;

    constructor (private authenticationService: AuthenticationService) {
    }

    secretSubmit() {
        this.authenticationService.authenticate(this.secretText);
    }

}
