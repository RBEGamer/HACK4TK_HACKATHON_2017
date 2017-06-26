import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {MediaService} from "../../../../services/media-service";


@Component({
  selector: 'ucp-media-center-download',
  templateUrl: 'media-center-download.component.html',
  styleUrls: ['media-center-download.css']
})
export class MediaCenterDownloadComponent extends DynamicComponentAbstract {

  constructor(private mediaService: MediaService) {
    super();
  }

  getUrl(path: string) {
    return this.mediaService.resolveAssetByPath(path);
  }
}
