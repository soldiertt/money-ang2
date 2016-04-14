import {Component, Directive, ElementRef} from "angular2/core";

@Directive({
  selector: "[focusOnInit]"
})
export class FocusOnInitDirective {

    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit() {
        this.elementRef.nativeElement.focus();
    }
}
