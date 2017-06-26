import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";

@Injectable()
export class PlatformService {
  private plattformId: string;

  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.plattformId = platformId;
  }


  isBrowser(): boolean {
    return isPlatformBrowser(this.plattformId)
  }

  isServer(): boolean {
    return isPlatformServer(this.plattformId);
  }
}
