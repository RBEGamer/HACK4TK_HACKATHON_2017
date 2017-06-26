import {Inject, Injectable} from "@angular/core";
import {ContentService} from "./content-service";
import {HttpService} from "./http-service";
import {Observable} from "rxjs";
import {Cache} from "./cache-service";

@Injectable()
export class ContentPreviewService extends ContentService {

  private request: any;
  private response: any;

  constructor(protected httpService: HttpService,
              protected cache: Cache,
              @Inject('req') req: any,
              @Inject('res') res: any) {

    super(httpService);

    this.request = req;
    this.response = res;
  }

  getContentByPath(path: string, lang?: string): Observable<any> {
    console.log('Returning Content from POST for preview');

    this.cache.set('content/' + path, {body: this.request.body});

    return Observable.of(this.request);
  }
}
