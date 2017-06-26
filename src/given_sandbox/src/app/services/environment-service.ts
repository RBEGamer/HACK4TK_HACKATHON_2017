import {Injectable} from '@angular/core';

@Injectable()
export class EnvironmentService {

  constructor() {
  }


  static isServerRendering() {
    return (typeof window == "undefined");
  }

  static isClientRendering() {
    return !this.isServerRendering();
  }

}
