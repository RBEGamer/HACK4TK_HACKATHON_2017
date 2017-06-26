import {Injectable} from "@angular/core";
/**
 * This service get the breadcrumb for the current page!
 * sb 06-Jun-17
 */
@Injectable()
export class BreadcrumbService {

  breadcrumbValues: any;

  constructor() {
  }

  setBreadcrumbValues(values: any) {
    this.breadcrumbValues = values;
  }

  getBreadcrumbValues() {
    return this.breadcrumbValues;
  }

}
