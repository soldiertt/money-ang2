import {Directive, ElementRef, HostListener, ViewEncapsulation} from 'angular2/core'

@Directive({
  selector: '[tooltip]',
  host:  {'[class.moneytooltip]':'true', '[class.showtooltip]':'isEnable', '[tabindex]':'1'}
})
export class TooltipDirective {
  isEnable: boolean = false;
  autoClose: any;

  constructor(el: ElementRef) {
  }

  @HostListener('click')
  enable($event) {
    if (this.isEnable) {
      this.isEnable = false;
    } else {
      this.isEnable = true;
    }
    return false;
  }

  @HostListener('mouseout')
  startAutoClose() {
    this.autoClose = setTimeout(() => { this.isEnable = false; }, 2000);
  }

  @HostListener('mouseover')
  cancelAutoClose() {
    clearTimeout(this.autoClose);
  }

  @HostListener('blur')
  close() {
    this.isEnable = false;
  }
}
