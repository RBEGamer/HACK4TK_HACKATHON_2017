import {Injectable} from "@angular/core";
import {ConfigurationService} from "./configuration-service";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/share";
import {UserSettings} from "../interfaces/user-settings";
import {Language} from "../interfaces/language";
import {Observable} from "rxjs";
import {ErrorType} from "../interfaces/enums/error-type";


@Injectable()
export class UserSettingsService {
  public userSettings: UserSettings;

  constructor(private configurationService: ConfigurationService) {
    this.userSettings = new UserSettings;
  }

  /**
   *
   * @returns {Observable<Language>}
   */
  getLanguage(): Observable<Language> {
    return new Observable(observer => {
      if (this.userSettings.selectedLanguage) {
        return observer.next(this.userSettings.selectedLanguage);
      }
      if (this.userSettings.preferredLanguage) {
        return observer.next(this.userSettings.preferredLanguage);
      }

      // No Language set, figure out standard-language
      this.configurationService.loadSettings().subscribe(document => {
        let languages = document.body.languages,
          masterLanguage = document.body.masterLanguage;

        if (!languages) {
          console.error('No language-configuration found');
          return observer.error(ErrorType.ressourceNotFound);
        }
        let userLanguage = languages.find(value => {
          return value.abbreviation.toLowerCase() == masterLanguage.toLowerCase();
        });

        this.userSettings.selectedLanguage = userLanguage;
        observer.next(userLanguage);
      }, error => {
        observer.error(error);
      })

    })
  }


}
