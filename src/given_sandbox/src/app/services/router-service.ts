import {Injectable} from "@angular/core";
import {UserSettingsService} from "./user-settings.service";
import {Language} from "../interfaces/language";
import {ActivatedRoute} from "@angular/router";
import {RouteData} from "../interfaces/route-data";

@Injectable()
export class RouterService {
  private userLanguage: Language;
  private routeData: RouteData;

  constructor(private userSettingsService: UserSettingsService, private activatedRoute: ActivatedRoute) {
    let language = this.userSettingsService.getLanguage();
    language.subscribe(
      language => this.userLanguage = language,
      error => console.error('The language configuration is invalid')
    );
    this.activatedRoute.data.subscribe(data => this.routeData = <RouteData>data);
  }

  /**
   *
   * @param {Language} language
   * @param {string} contentPath
   * @returns Array<any>
   */
  getRouteForContentId(contentPath: string): Array<any> {
    if (this.routeData.useLanguage) {
      return ['/', this.userLanguage.abbreviation, contentPath.substr(0, contentPath.length - 3)];
    }
    else {
      if (!contentPath.startsWith('/')) {
        contentPath = '/' + contentPath;
      }

      return contentPath.split('/');
    }
  }

}
