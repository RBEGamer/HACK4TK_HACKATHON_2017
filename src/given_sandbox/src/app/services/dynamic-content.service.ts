import {Injectable, ViewContainerRef, ComponentRef} from "@angular/core";
import {ElementService} from "./element-service";

@Injectable()
export class DynamicContentService {

  constructor(private elementService:ElementService) {
  }

  addElementsToArea(elementsList:any[], area:ViewContainerRef) {
    if (!elementsList || elementsList.length < 1) {
      return;
    }

    for (let element of elementsList) {
      this.addElement(element, area);
    }
  };

  addElement(element:any, area:ViewContainerRef):any {
    let cmp = this.elementService
      .resolveComponent(element.className);

    let cmpRef:ComponentRef<any> = area.createComponent(cmp);
    cmpRef.instance.element = element.element;
    cmpRef.instance.className = element.className;

    return cmpRef;
  }


}
