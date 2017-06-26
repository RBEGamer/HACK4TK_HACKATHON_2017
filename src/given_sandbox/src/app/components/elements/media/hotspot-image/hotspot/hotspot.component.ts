import {Component, ElementRef} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'hotspot',
  templateUrl: 'hotspot.component.html',
  styleUrls: ['hotspot.component.css'],
  animations: [
    trigger('hotspotState', [
      state('void', style({
        'opacity': 0,
        transform: 'scale(0.7)'
      })),
      state('1', style({
        'opacity': 1,
        transform: 'scale(1.0)'
      })),
      transition('void <=> 1', animate('100ms ease-in'))
    ])
  ]
})
export class HotspotComponent extends DynamicComponentAbstract {

  visible = false;

  constructor(private elementRef: ElementRef) {
    super();
  }

  toggle(event: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (!this.visible) {
      this.elementRef.nativeElement
        .dispatchEvent(new CustomEvent('hide-hotspots', {
          detail: false,
          bubbles: true
        }));
    }

    setTimeout(() => {
      this.visible = true;
    }, 200)


  }

  hideHotspot() {
    this.visible = false;
  }

  getPositionCoordinates() {
    return {
      'left.%': this.element.posX,
      'top.%': this.element.posY

    }
  }

  getCardPositionCoordinates() {
    return {
      'left.%': this.calculateLeft(this.element.posX),
      'top.%': this.calculateTop(this.element.posY)
    }
  }


  calculateLeft(posX: number): number {
    return (posX >= 55) ? posX - 55 : 5 + +posX;
  }

  calculateTop(posY: number): number {
    if (posY >= 10 && posY <= 80) {
      return +posY - 10;
    }

    if (posY > 80) {
      return 70
    }
    return 5;
  }

}
