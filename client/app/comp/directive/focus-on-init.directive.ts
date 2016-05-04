import {Component, Directive, ElementRef} from "@angular/core";

@Directive({
  selector: "[focusOnInit]"
})
export class FocusOnInitDirective {

    constructor(private elementRef: ElementRef) {}

    ngAfterViewInit() {
        this.elementRef.nativeElement.focus();
    }
}
