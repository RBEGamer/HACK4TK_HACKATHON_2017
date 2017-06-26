import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {HttpService} from "./http-service";
import {Bookmark, BookmarkGroup} from "../Interfaces/bookmark";


//  List all groups of Bookmarks of the current user
//  GET http://localhost:4000/api/data/bookmarkgroups
const RELATIVE_PATH = "api/data/";

const PREFIX_CACHE_KEY = "INTRANET_";

@Injectable()
export class DataFinderService {

  constructor(protected httpService: HttpService) {
  }

  find(type: string, query: string): Observable<any> {
    return this.httpService.performApiGetRequest(RELATIVE_PATH + type + '?'+query)
      .map(response => response.body)
      .flatMap(result => {
        if (!result) {
          return Observable.throw('No result found');
        }

        return Observable.of(result);
      });
  }




}
