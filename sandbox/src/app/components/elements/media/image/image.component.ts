import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {LightboxService} from "../../../../../modules/lightbox/lightbox.service";
import {MediaService} from "../../../../services/media-service";


@Component({
  selector: 'image',
  templateUrl: 'image.component.html',
  styleUrls: ['image.component.css']
})
export class ImageComponent extends DynamicComponentAbstract {


  constructor(private lightboxService: LightboxService) {
    super();
  }

  showInLightbox(event: CustomEvent) {
    console.log("showInLightbox");
    this.lightboxService.openByImage(this.element.image);
  }
}
