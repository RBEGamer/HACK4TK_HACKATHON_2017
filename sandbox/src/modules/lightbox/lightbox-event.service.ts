import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

export interface IEvent {
  id: LIGHTBOX_EVENT;
  data?: any;
}

export interface LightboxAlbum {
  src: string;
  caption?: string;
  thumb: string;
  type: LIGHTBOX_TYPE;
}

export enum LIGHTBOX_TYPE {
  VIDEO = 1,
  IMAGE = 2
}

export enum LIGHTBOX_EVENT {
  CHANGE_PAGE = 1,
  CLOSE = 2,
  OPEN = 3
}
;

@Injectable()
export class LightboxEvent {
  private _lightboxEventSource: Subject<Object>;
  public lightboxEvent$: Observable<Object>;

  constructor() {
    this._lightboxEventSource = new Subject<Object>();
    this.lightboxEvent$ = this._lightboxEventSource.asObservable();
  }

  broadcastLightboxEvent(event: any): void {
    this._lightboxEventSource.next(event);
  }
}
