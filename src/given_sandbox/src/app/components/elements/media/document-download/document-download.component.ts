import {Component, Input} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {MediaService} from "../../../../services/media-service";

@Component({
  selector: 'ucp-document-download',
  templateUrl: 'document-download.component.html'
})

export class DocumentDownloadComponent extends DynamicComponentAbstract {
  @Input() element: any;

  constructor(private mediaService: MediaService) {
    super();
  }

  getUrl(path: string) {
    return this.mediaService.resolveAssetByPath(path);
  }
}
