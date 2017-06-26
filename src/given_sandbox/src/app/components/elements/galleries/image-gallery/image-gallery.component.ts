import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {LightboxAlbum, LIGHTBOX_TYPE} from "../../../../../modules/lightbox/lightbox-event.service";
import {LightboxService} from "../../../../../modules/lightbox/lightbox.service";
import {MediaService} from "../../../../services/media-service";

@Component({
  selector: 'image-gallery',
  templateUrl: 'image-gallery.component.html',
  styleUrls: ['image-gallery.css']
})
export class ImageGalleryComponent extends DynamicComponentAbstract {
  constructor(private lightboxService: LightboxService,
              private mediaService: MediaService) {
    super();
  }

  showLightboxAlbum(event: CustomEvent) {
    let album = this.transformIntoAlbum();

    this.lightboxService.open(album, event.detail.position);
  }

  private transformIntoAlbum() {
    let album: Array<LightboxAlbum> = [];

    for (let item of this.element.imageList) {
      album.push({
        type: LIGHTBOX_TYPE.IMAGE,
        thumb: this.mediaService.resolveAssetByPath(item.element.previewImage.source),
        src: this.mediaService.resolveAssetByPath(item.element.originalImage.source),
        caption: this.element.caption
      })
    }

    return album;
  }

}
