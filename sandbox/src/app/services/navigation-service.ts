import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import {Language} from "../interfaces/language";
import {HttpService} from "./http-service";


@Injectable()
export class NavigationService {

  private readonly CACHE_KEY = 'navigation';

  constructor(private httpService: HttpService) {
  }

  getNavigation(language: Language): Observable<any> {
    let cacheKey = this.CACHE_KEY + '/' + language.abbreviation,
      path = 'api/navigation/' + language.abbreviation;

    return this.httpService.performApiGetRequest(path, cacheKey);
  }
}
