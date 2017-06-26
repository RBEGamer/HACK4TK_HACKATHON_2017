import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {TransferState} from "../../system/transfer-state/transfer-state";

@Injectable()
export class HttpService {

  constructor(private http: Http, protected transferState: TransferState) {
  }

  /**
   * Retrieves data from the API. Includes caching functionality if cacheKey is provided
   * @param path
   * @param cacheKey
   * @returns {Observable}
   */
  performApiGetRequest(path: string, cacheKey?: string): Observable<any> {

    if (cacheKey && this.transferState.get(cacheKey)) {
      console.log(`Return ${path} from CACHE`);
      return Observable.of(this.transferState.get(cacheKey));
    }

    let endpoint = this.getEndpoint(path),
      headers = this.getHeaders('GET');

    console.info('Performing GET Request:', endpoint, cacheKey);

    console.time('GET Request: ' + path);
    return this.http.get(endpoint, {headers: headers}).first()
      .map(HttpService.extractData)
      .do(json => {
        console.timeEnd('GET Request: ' + path);
        if (cacheKey) {
          this.transferState.set(cacheKey, json);
        }
      })
      .catch(HttpService.handleError)
  }

  performApiPostRequest(path: string, data: any): Observable<any> {
    console.log("POST data ", JSON.stringify(data), path);

    let endpoint = this.getEndpoint(path),
      postData = HttpService.getStringifiedData(data),
      headers = this.getHeaders("POST");


    return this.http.post(endpoint, postData, {headers: headers}).first()
      .map(HttpService.extractData)
      .catch(HttpService.handleError);

  }

  performApiPutRequest(path: string, data: any): Observable<any> {
    let endpoint = this.getEndpoint(path),
      putData = HttpService.getStringifiedData(data),
      headers = this.getHeaders("PUT");

    return this.http.put(endpoint, putData, {headers: headers})
      .map(HttpService.extractData)
      .catch(HttpService.handleError);

  }

  performApiDeleteRequest(path: string): Observable<any> {
    let endpoint = this.getEndpoint(path),
      headers = this.getHeaders("DELETE");

    return this.http.delete(endpoint, {headers: headers})
      .map(HttpService.extractData)
      .catch(HttpService.handleError);

  }

  static getEmptyObservable(): Observable<any> {
    return Observable.empty<any>();
  }

  private getEndpoint(path: string) {
    let host = this.transferState.get('TEST_API_HOST');
    if (!host) {
      host = this.transferState.get('API_HOST');
    }
    else {
      let prefix = this.transferState.get('TEST_BY_PATH_STARTS_WITH');
      if (prefix) {
        if (!path.startsWith(prefix)) {
          host = this.transferState.get('API_HOST');
        }
      }
    }
    if (!host) {
      console.error('No API_HOST set');
    }
    return host + path;
  }

  protected static getStringifiedData(data: any) {
    return JSON.stringify(data || {});
  }

  private getHeaders(method: string): Headers {
    let headers = new Headers({});
    if (method !== 'GET') {
      headers.append('Content-Type', 'application/json; ; charset=utf-8'); // 'application/x-www-form-urlencoded');
    }

    if (this.transferState.get('TEST_WEB_SEAL_IV_USER')) {
      console.log("SET TEST WebSEAL iv-user", this.transferState.get('TEST_WEB_SEAL_IV_USER'));
      headers.set('iv-user', this.transferState.get('TEST_WEB_SEAL_IV_USER'));
    }

    return headers;
  }

  protected static extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  protected static handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} ${error.url} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    // console.error(error);
    return Observable.throw(errMsg);
  }


}
