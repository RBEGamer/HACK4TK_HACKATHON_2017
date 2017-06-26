import {Directive, ElementRef, HostBinding, Input} from "@angular/core";
import {MediaService} from "../services/media-service";


@Directive({selector: '[assetPath]'})
export class AssetPathDirective {

  constructor(protected mediaService: MediaService,
              protected elementRef: ElementRef) {
  }


  // used for tag IMG
  @HostBinding('attr.src')
  src: string;

  // used for tag A
  @HostBinding('attr.href')
  href: string;

  @Input() set assetPath(path: string) {
    if (!path) {
      console.error('No Path for directive AssetPath set', this.elementRef)
    }
    let assetPath = this.mediaService.resolveAssetByPath(path),
      elName = this.elementRef.nativeElement.name || this.elementRef.nativeElement.localName;

    if ('img' == elName.toLowerCase()) {
      this.src = assetPath;
    }
    else {
      this.href = assetPath;
    }
  }
}
