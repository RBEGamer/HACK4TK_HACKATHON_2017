import {UserSettingsService} from "../app/services/user-settings.service";
import {IntranetService} from "../app/services/intranet-service";
import {ConfigurationService} from "../app/services/configuration-service";
import {HttpService} from "../app/services/http-service";
import {NavigationService} from "../app/services/navigation-service";
import {ContentService} from "../app/services/content-service";
import {Cache} from "../app/services/cache-service";
import {Http} from "@angular/http";
import {IntranetServiceMock} from "../app/services/mock/intranet-service-mock";
import {NavigationServiceMock} from "../app/services/mock/navigation-service-mock";
import {ContentServiceMock} from "../app/services/mock/content-service-mock";
import {MediaServiceMock} from "../app/services/mock/media-service-mock";
import {MediaService} from "../app/services/media-service";

export const DYNAMIC_PROVIDERS: any[] = [{
  provide: ContentService,
  useFactory: contentServiceFactory,
  deps: [HttpService, ConfigurationService, Cache]
}, {
  provide: NavigationService,
  useFactory: navigationServiceFactory,
  deps: [HttpService, ConfigurationService]
}, {
  provide: IntranetService,
  useFactory: intranetServiceFactory,
  deps: [Http, Cache, ConfigurationService, UserSettingsService]
}, {
  provide: MediaService,
  useFactory: mediaServiceFactory,
  deps: [ConfigurationService]
}
];


export function contentServiceFactory(httpService, configurationService, cache) {
  // let req = Zone.current.get('req');
  // let res = Zone.current.get('res');
  //
  // if (req && req.method == 'POST') {
  //   return new ContentPreviewService(httpService, cache, req, res);
  // }

  if (configurationService.isMockEnabled()) {
    console.info('+++ ContentService: [MOCK]');
    return new ContentServiceMock(httpService);
  }
  else {
    return new ContentService(httpService);
  }
}
export function navigationServiceFactory(httpService, configurationService) {
  if (configurationService.isMockEnabled()) {
    console.info('+++ NavigationService: [MOCK]');
    return new NavigationServiceMock(httpService);
  }
  else {
    return new NavigationService(httpService);
  }
}

export function intranetServiceFactory(http, cache, configurationService, userSettingsService) {
  if (configurationService.isMockEnabled()) {
    console.info('+++ IntranetService: [MOCK]');
    return new IntranetServiceMock(http, cache, configurationService, userSettingsService);
  }
  else {
    return new IntranetService(http, cache, configurationService, userSettingsService);
  }
}

export function mediaServiceFactory(configurationService) {
  if (configurationService.isMockEnabled()) {
    console.info('+++ MediaService: [MOCK]');
    return new MediaServiceMock(configurationService);
  }
  else {
    return new MediaService(configurationService);
  }
}
