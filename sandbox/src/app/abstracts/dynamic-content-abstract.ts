import {ComponentFactoryResolver, ComponentRef, ViewContainerRef} from "@angular/core";
import {ComponentRegistry} from "../../component-management/component-registry";
import {DynamicComponentAbstract} from "./dynamic-component-abstract";

export abstract class DynamicContentAbstract extends DynamicComponentAbstract {


  constructor(protected resolver: ComponentFactoryResolver) {
    super();

  }

  addElementsToArea(elementsList: any[], area: ViewContainerRef) {
    if (!elementsList || elementsList.length < 1) {
      return;
    }

    for (let element of elementsList) {
      this.addElement(element, area);
    }
  };

  addElement(element: any, area: ViewContainerRef): any {
    let component = ComponentRegistry.getComponentByName(element.className),
      cmp = this.resolver.resolveComponentFactory(component);


    let cmpRef: ComponentRef<any> = area.createComponent(cmp);
    cmpRef.instance.element = element.element;
    cmpRef.instance.className = element.className;

    return cmpRef;


  }
}
