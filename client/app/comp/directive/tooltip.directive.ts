import {Directive, ElementRef, HostListener, ViewEncapsulation} from 'angular2/core'

@Directive({
  selector: '[tooltip]',
  inputs: ['isActive : tooltip'],
  host:  {'[class.moneytooltip]':'isActive == "true"', '[class.showtooltip]':'displayed', '[class.displayleft]':'displayLeft', '[tabindex]':'1'}
})
export class TooltipDirective {
  isActive: string; //Is mapped to a string and not converted to boolean :-(
  displayed: boolean = false;
  autoClose: any;
  displayLeft: boolean = false;

  constructor(el: ElementRef) {
  }

  @HostListener('click', ["$event"])
  enable($event) {
    if (this.isActive == "true") {
      if ($event.clientX - $event.offsetX + 450 > window.innerWidth) {
        this.displayLeft = true;
      } else {
        this.displayLeft = false;
      }

      if (this.displayed) {
        this.displayed = false;
      } else {
        this.displayed = true;
      }
    }
    return false;
  }

  @HostListener('mouseout')
  startAutoClose() {
    this.autoClose = setTimeout(() => { this.displayed = false; }, 1000);
  }

  @HostListener('mouseover')
  cancelAutoClose() {
    clearTimeout(this.autoClose);
  }

  @HostListener('blur')
  close() {
    this.displayed = false;
  }
}
