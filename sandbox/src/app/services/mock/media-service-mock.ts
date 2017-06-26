import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Observable";
import {NavigationService} from "../navigation-service";
import {ConfigurationService} from "../configuration-service";


@Injectable()
export class MediaServiceMock {

  public static readonly ASSET_DIR = '/assets/img/content';

  constructor(private configurationService: ConfigurationService) {
  }

  resolveAssetByPath(path: string): string {

    if (!path || !path.lastIndexOf('/')) {
      return null;
    }
    let indexSlash = path.lastIndexOf('/');

    let imageFilename = path.substr(indexSlash);

    if (imageFilename.indexOf('.') == -1) {
      imageFilename = imageFilename + ".jpg";
    }

    return  MediaServiceMock.ASSET_DIR + imageFilename;


  }
}
