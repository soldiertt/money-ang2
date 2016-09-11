import {Component, OnInit, Input, Host} from "@angular/core";
import {NgControl, FormGroupDirective} from "@angular/forms";

@Component({
  selector: "display-error",
  template: `<div *ngIf="isDisplayed()" class="alert alert-danger"><ng-content></ng-content></div>`
})
export class DisplayErrorDirective implements OnInit {
  @Input("control") controlName: string;
  @Input() error: string;
  control: NgControl;
  // we inject the form model
  constructor(@Host() private hostFormGroup: FormGroupDirective) {
  }
  // we then find the control
  ngOnInit() {
    this.control = this.hostFormGroup.directives.find(dir => dir.name === this.controlName);
  }
  // the div in the template will only be added if
  // the control is dirty and has the specified error
  isDisplayed() {
    return (this.control.dirty || this.controlName === "csvfile") && this.control.errors && this.control.errors.hasOwnProperty(this.error);
  }
}
