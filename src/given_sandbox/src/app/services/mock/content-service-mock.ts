import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import {ContentService} from "../content-service";


@Injectable()
export class ContentServiceMock extends ContentService {

  getContentByPath(path: string, lang?: string): Observable<any> {
    console.log('fetching path from mock ', path);

    let mockContext = require.context(
      "../../../mock/content", true, /.*\.json/);

    let mockContent = mockContext.keys().map(mockContext);

    let found = false;
    for (let c of mockContent) {
      if (c.id == path) {
        return new Observable(observer => {
          observer.next({body: c});
          found = true;
        });
      }
    }
    if (!found) {
      let body404 = {
        'id': 'DE_404',
        'pageTemplate': 'content-right',
        'title': 'Universal Online Architecture page 1',
        'elements': {
          'right': [],
          'content': [
            {
              'className': 'page-headline',
              'element': {
                'headline': '404 Not Found'
              }
            }, {
              'className': 'standard-text',
              'element': {
                'dark': false,
                'text': '<p>Diese Seite existiert nicht </p>'
              }
            }]
        }
      };

      return new Observable(observer => {
        observer.next({body: body404});
      });
    }
  }


  getPartialContent(collection: string, query: string): Observable<any> {
    console.log('fetching partial content from mock', collection);
    let mockContext = require.context(
      "../../../mock/partial-content", true, /.*\.json/);

    let mockContent = mockContext.keys().map(mockContext);

    let found = false;
    for (let contentEntry of mockContent) {
      if (contentEntry.id == collection) {
        return new Observable(observer => {
          observer.next(contentEntry.mockContent);
          found = true;
        });
      }
    }

    return new Observable(observer => {
      observer.next([]);
    });
  }
}
