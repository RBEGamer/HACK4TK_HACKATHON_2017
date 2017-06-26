import {Injectable} from "@angular/core";
import {VideoType} from "../interfaces/enums/video-type";

@Injectable()
export class UrlResolverService {


  constructor() {
  }


  getVideoUrl(type: VideoType, videoId: number) {
    let url: string;

    switch (type) {
      case VideoType.YouTube:
        return '//www.youtube.com/embed/' + videoId + '?wmode=opaque&autoplay=1';
      case VideoType.MovingImage24:
        return '//www.edge-cdn.net/video_' + videoId + '?playerskin=44940&start=1';
      case VideoType.Flixel:
        return '//media.flixel.com/cinemagraph/' + videoId + '?hd=true&forceGif=true';
    }
  }
}
