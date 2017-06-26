import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/share";
import {HttpService} from "./http-service";


@Injectable()
export class ContentService {
  constructor(protected httpService: HttpService) {
  }

  getPagesBySearchKeyword(keyword: string): Observable<any> {
    let targetEndpoint = 'api/search/' + keyword;

    console.log('Fetching search response from ' + targetEndpoint);

    return this.httpService.performApiGetRequest(targetEndpoint);
  }


  getPartialContent(collection: string, query: string): Observable<any> {
    console.log('fetching partial content', collection, query);
    let targetEndpoint = 'api/partial-content/' + collection + '/' + query;

    return this.httpService.performApiGetRequest(targetEndpoint, targetEndpoint).map(value => {
      try {
        return value.body._embedded['rh:doc'];
      }
      catch (ex) {
        return null;
      }
    });
  }

  getContentById(contentId: string, lang?: string): Observable<any> {
    let targetEndpoint = 'api/content/' + contentId;

    return this.httpService.performApiGetRequest(targetEndpoint, 'content/' + contentId);
  }

  getContentByPath(path: string): Observable<any> {
    let targetEndpoint = 'api/content-path/' + path;

    return this.httpService.performApiGetRequest(targetEndpoint, 'content/' + path);
  }

}
