import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {Component, OnInit} from "@angular/core";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UrlResolverService} from "../../../../services/url-resolver-service";
import {VideoType} from "../../../../interfaces/enums/video-type";
import {LightboxService} from "../../../../../modules/lightbox/lightbox.service";
import {LIGHTBOX_TYPE, LightboxAlbum} from "../../../../../modules/lightbox/lightbox-event.service";

@Component({
  selector: 'ucp-video',
  templateUrl: 'video.component.html',
  styleUrls: ['video.component.css']
})
export class VideoComponent extends DynamicComponentAbstract implements OnInit {
  public videoVisible: boolean = false;
  current_url: SafeUrl;

  constructor(private sanitizer: DomSanitizer,
              private urlResolverService: UrlResolverService,
              private _lightbox: LightboxService) {
    super();
  }

  ngOnInit() {
    this.current_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.getVideoUrl());
  }

  playVideo() {

    if (this.element.lightbox && this.element.videoId) {
      let album: Array<LightboxAlbum> = [{
        type: LIGHTBOX_TYPE.VIDEO,
        src: this.getVideoUrl(),
        caption: (!!this.element.caption ? this.element.caption : null),
        thumb: this.element.image.source
      }];
      this._lightbox.open(album)
    }
    else {
      if (this.element.videoId) {
        this.videoVisible = true;
      }
    }
  }

  getVideoType() {
    switch (this.element.type.toLowerCase()) {
      case 'youtube':
        return VideoType.YouTube;
      case 'mi24':
        return VideoType.MovingImage24;
      case 'flixel':
        return VideoType.Flixel;
    }
  }

  private getVideoUrl() {
    return this.urlResolverService.getVideoUrl(this.getVideoType(), this.element.videoId);
  }

  updateLightbox(status: boolean) {
    this.videoVisible = status;
  }


}
