import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import {ConfigurationService} from "../configuration-service";
import {Cache} from "../cache-service";
import {Http} from "@angular/http";
import {UserSettingsService} from "../user-settings.service";
import {IntranetService} from "../intranet-service";


@Injectable()
export class IntranetServiceMock extends IntranetService {

  constructor(protected http: Http,
              protected cache: Cache,
              protected configurationService: ConfigurationService,
              protected userSettingsService: UserSettingsService) {
    super(http, cache, configurationService, userSettingsService);
  }

  performGetReguest(path: string, lang?: string): Observable<any> {
    console.log('GET intranet service response by MOCK:', path);

    let mockContext = require.context(
      "../../../mock/service", true, /.*\.json/);

    let mockContent = mockContext.keys().map(mockContext);

    let found = false;
    for (let c of mockContent) {

      if (c.action == path) {

        return new Observable(observer => {
          setTimeout(() =>{
            observer.next({status: 200, body: c.responseBody});
            found = true;
          }, 1);

        });
      }
    }
    if (!found) {
      let body404 = {
        status: 404,
        body: {}
      };
      this.cache.set(path, body404);

      return new Observable(observer => {
        observer.next(body404);
      });
    }
  }

  performPostRequest(path: string, postData: any): Observable<any> {
    console.log('Post intranet service response from mock ', path);


    return new Observable(observer => {
      observer.next({status: 200, body: postData});
    });

  }

}
