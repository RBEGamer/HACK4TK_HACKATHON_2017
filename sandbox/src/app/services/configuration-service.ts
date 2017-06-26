import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/from";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/share";
import "rxjs/add/operator/throttle";
import {Language} from "../interfaces/language";
import {Observable} from "rxjs";
import {HttpService} from "./http-service";
import {TransferState} from "../../system/transfer-state/transfer-state";
import {ProjectConfiguration} from "../interfaces/project-configuration";


@Injectable()
export class ConfigurationService {

  public static readonly CACHE_KEY = 'configuration';

  constructor(private httpService: HttpService, protected transferState: TransferState) {
  }

  loadSettings(): Observable<any> {

    if (this.isMockEnabled()) {
      console.log('Setup Cache with Mock content e.g. settings.json ');

      let settingContext = require.context("../../mock/api", true, /.*\.json/);

      let setting = settingContext.keys().map(settingContext);
      this.setSettings(setting[0]);
    }

    let path = 'api/settings';

    return this.httpService.performApiGetRequest(path, ConfigurationService.CACHE_KEY);
  }

  setSettings(settings: any): void {
    this.transferState.set(ConfigurationService.CACHE_KEY, settings);
  }

  getLanguages(): Observable<Array<Language>> {
    return this.getConfigurationElement('languages');
  }

  private getConfigurationElement(name: string): Observable<any> {
    if (this.transferState.get(ConfigurationService.CACHE_KEY)) {
      return Observable.of(this.transferState.get(ConfigurationService.CACHE_KEY).body[name]);
    }

    return new Observable(observer => {
      this.loadSettings().do(document => {
        this.transferState.set(ConfigurationService.CACHE_KEY, document);
        observer.next(document.body[name]);
      });
    })
  }

  isMockEnabled(): boolean {
    return true;
  }

  getApiHost(): string {
    return this.transferState.get('API_HOST');
  }

  getStartpage(): Observable<string> {
    return this.getConfigurationElement('startpage');
  }

  getProjectConfiguration(): Observable<ProjectConfiguration> {
    return this.getConfigurationElement('project-configuration');
  }

  getFooter(): Observable<any> {
    return this.getConfigurationElement('footer');
  }
}
