import {Injectable} from "@angular/core";
import {ConfigurationService} from "./configuration-service";

@Injectable()
export class MediaService {

  constructor(private configurationService: ConfigurationService) {
  }

  resolveAssetByPath(path: string): string {
    if (!path) {
      return null;
    }

    if (typeof path !== 'string') {
      throw Error('The path passed to MediaService is not a string.');
    }

    let slash = path.lastIndexOf('/'),
      api = this.configurationService.getApiHost();

    return api + 'binary' + path.substr(slash);
  }

}
