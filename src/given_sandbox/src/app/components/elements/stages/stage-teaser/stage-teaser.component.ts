import {Component, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {browserDetection} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'stage-teaser',
  templateUrl: 'stage-teaser.component.html',
  styleUrls: ['stage-teaser.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StageTeaserComponent extends DynamicComponentAbstract {
  gridLayoutA: string;
  gridLayoutB: string;

  isAreaAEnabled() {
    return this.element.teaserA !== undefined && this.element.teaserA.length > 0;
  }

  isAreaBEnabled() {
    return this.element.teaserB !== undefined && this.element.teaserB.length > 0;
  }

  getGridLayoutForAreaA() {
    let templateClassPrefix = "template-a-";

    switch(this.element.teaserA) {
      case "1":
        // Template with 1 or 2 teasers
        this.gridLayoutA = "1";
      case "2":
        // Template with 3 teasers
        this.gridLayoutA = "3";
      case "3":
        // template with 6 teasers
        this.gridLayoutA = "6";
      case "4":
        // template with 8 teasers
        this.gridLayoutA = "8";
      default:
        this.gridLayoutA = null;
    }

    return this.gridLayoutA == null
      ? ''
      : templateClassPrefix + this.gridLayoutA;
  };

  getGridLayoutForAreaB() {
    let templateClassPrefix = "template-b-";

    switch(this.element.teaserB) {
      case "1":
        // Template with 3 teasers (Mission Statement)
        this.gridLayoutB = "3b";
      case "2":
        // Template with 3 Teaser (Hero-Teaser)
        this.gridLayoutB = "3a";
      case "3":
        // template with 4 teasers
        this.gridLayoutB = "4";
      default:
        this.gridLayoutB = null;
    }

    return this.gridLayoutB == null
      ? ''
      : templateClassPrefix + this.gridLayoutB;
  };

  // setStageTeaserGridClass(teaserAorB: string) {
  //   // console.log('HeroTeaserComponent->setImageTeaserStyle->teaserAorB: ' + teaserAorB);
  //   switch (teaserAorB) {
  //     case "1":
  //       return 'normal ';
  //     case "2":
  //       return 'wide ';
  //     case "3":
  //       return 'wider ';
  //     case "4":
  //       return 'full ';
  //     default:
  //       break;
  //   }
  //   return '';
  // }

}
