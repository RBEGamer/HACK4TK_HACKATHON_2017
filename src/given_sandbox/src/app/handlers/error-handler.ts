import {Observable} from "rxjs";
export class ErrorHandler {

  static handleError(error: any) {
    console.error('Error fetching data');
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
