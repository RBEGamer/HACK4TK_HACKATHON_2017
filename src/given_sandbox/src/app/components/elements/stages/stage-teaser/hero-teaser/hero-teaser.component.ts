import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";
import objectFitImages from 'object-fit-images';


@Component({
  selector: 'hero-teaser',
  templateUrl: 'hero-teaser.component.html',
  styleUrls: ['hero-teaser.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeroTeaserComponent extends DynamicComponentAbstract {

  ngAfterViewChecked() {
    objectFitImages('.hero-teaser-image');
  }
}
