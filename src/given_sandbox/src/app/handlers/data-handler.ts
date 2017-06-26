import {Response} from "@angular/http";
export class DataHandler {

  static extractData(res: Response) {
    return res.json() || {};
  }
}
