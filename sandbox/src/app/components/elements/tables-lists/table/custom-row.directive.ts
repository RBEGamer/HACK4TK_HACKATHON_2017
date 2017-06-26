import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[custom-row]'
})

export class CustomRowDirective {
  @Input()
  element: any;

  @Input()
  logicalRow: number;

}
