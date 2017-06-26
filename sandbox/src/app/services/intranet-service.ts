import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/share";
import {ConfigurationService} from "./configuration-service";
import {Cache} from "./cache-service";
import {UserSettingsService} from "./user-settings.service";


@Injectable()
export class IntranetService {

  constructor(protected http: Http,
              protected cache: Cache,
              protected configurationService: ConfigurationService,
              protected userSettingsService: UserSettingsService) {
  }

  performGetReguest(path: string, lang?: string): Observable<any> {

    // http://localhost:4000/api/rest/action/apps
    // DEV: this.cache.performGetReguest('API_HOST') + 'api/rest/action/' + path
    let API_RS_HOST = this.getHostName();

    console.log('GET rest endpoint ', API_RS_HOST + 'api/rest/action/' + path);
    let targetEndpoint = API_RS_HOST + 'api/rest/action/' + path;

    return this.http.get(targetEndpoint)
      .map(this.extractData)
      .catch(this.handleError);
  }

  performPostRequest(path: string, data: any): Observable<any> {
    let API_RS_HOST = this.getHostName();

    console.log('POST rest endpoint ', API_RS_HOST + 'api/rest/action/' + path);
    let targetEndpoint = API_RS_HOST + 'api/rest/action/' + path;

    let postData;
    if (data) {
      postData = JSON.stringify(data);

      let headers = new Headers({'Content-Type': 'application/json; ; charset=utf-8'});

      return this.http.post(targetEndpoint, postData, {headers: headers})
        .map(this.extractData)
        .catch(this.handleError);
    }
  }


  private getHostName(): string {
    // http://localhost:4000/api/rest/action/apps
    // DEV: this.cache.performGetReguest('API_HOST') + 'api/rest/action/' + path
    let API_RS_HOST = this.cache.get('API_RS_HOST');
    if (!API_RS_HOST) {
      API_RS_HOST = this.cache.get('API_HOST');
    }
    return API_RS_HOST;
  }

  private extractData(res: Response) {
    let body = res.json();

    if (body.statusCode == 200) {
      return body || {};
    }
    else {
      return {
        'status': 404,
        'body': {}
      }
    }
  }


  private handleError(error: any) {
    console.error('IntranetService error fetching data');
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    console.error(error);
    return Observable.throw(errMsg);
  }
}
