import {ApplicationRef, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector} from "@angular/core";
import {DOCUMENT} from "@angular/platform-browser";
import {LightboxComponent} from "./lightbox.component";
import {LightboxConfig} from "./lightbox-config.service";
import {LightboxAlbum, LIGHTBOX_EVENT, LightboxEvent, LIGHTBOX_TYPE} from "./lightbox-event.service";
import {LightboxOverlayComponent} from "./lightbox-overlay.component";
import {MediaService} from "../../app/services/media-service";

@Injectable()
export class LightboxService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private mediaService: MediaService,
              private injector: Injector,
              private _applicationRef: ApplicationRef,
              private lightboxConfig: LightboxConfig,
              private lightboxEvent: LightboxEvent,
              @Inject(DOCUMENT) private documentRef: any) {
  }


  openByImage(image: any) {
    let album: Array<LightboxAlbum> = [];
    album.push({
      type: LIGHTBOX_TYPE.IMAGE,
      thumb: this.mediaService.resolveAssetByPath(image.source),
      src: this.mediaService.resolveAssetByPath(image.source),
      caption: image.title
    })
    this.open(album);
  }

  open(album: Array<LightboxAlbum>, curIndex = 0, options = {}): void {
    const overlayComponentRef = this.createComponent(LightboxOverlayComponent);
    const componentRef = this.createComponent(LightboxComponent);
    const newOptions = {};

    // broadcast open event
    this.lightboxEvent.broadcastLightboxEvent(LIGHTBOX_EVENT.OPEN);
    Object.assign(newOptions, this.lightboxConfig, options);

    // attach input to lightbox
    componentRef.instance.album = album;
    componentRef.instance.currentImageIndex = curIndex;
    componentRef.instance.options = newOptions;
    componentRef.instance.cmpRef = componentRef;

    // attach input to overlay
    overlayComponentRef.instance.options = newOptions;
    overlayComponentRef.instance.cmpRef = overlayComponentRef;

    // FIXME: not sure why last event is broadcasted (which is CLOSED) and make
    // lightbox can not be opened the second time.
    // Need to timeout so that the OPEN event is set before component is initialized
    setTimeout(() => {
      this._applicationRef.attachView(overlayComponentRef.hostView);
      this._applicationRef.attachView(componentRef.hostView);
      overlayComponentRef.onDestroy(() => {
        this._applicationRef.detachView(overlayComponentRef.hostView);
      });
      componentRef.onDestroy(() => {
        this._applicationRef.detachView(componentRef.hostView);
      });

      this.documentRef.querySelector('body').appendChild(overlayComponentRef.location.nativeElement);
      this.documentRef.querySelector('body').appendChild(componentRef.location.nativeElement);
    });
  }

  createComponent(ComponentClass: any): ComponentRef<any> {
    const factory = this.componentFactoryResolver.resolveComponentFactory(ComponentClass);
    const component = factory.create(this.injector);

    return component;
  }
}
