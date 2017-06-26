import {Component, ElementRef} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'hotspot-image',
  templateUrl: 'hotspot-image.component.html',
  styleUrls: ['hotspot-image.component.css']
})
export class HotspotImageComponent extends DynamicComponentAbstract {

  constructor(private elementRef: ElementRef) {
    super();
  }


  hideAllHotspots(event: CustomEvent) {
    let hotspots = this.elementRef.nativeElement.querySelectorAll('.hotspot');

    hotspots.forEach(hotspot => hotspot.dispatchEvent(
      new CustomEvent('hide-hotspot', {
        detail: false,
        bubbles: true
      })
    ))

  }
}
