import {Injectable, ComponentFactoryResolver} from "@angular/core";
import {EmptyPlaceholderComponent} from "../components/elements/empty-placeholder/empty-placeholder.component";
import {ComponentRegistry} from "../../component-management/component-registry";

@Injectable()
export class ElementService {

  constructor(private resolver: ComponentFactoryResolver) {
  }


  resolveComponent(name: string) {
    for (let component of ComponentRegistry.commonComponents) {
      if (component.name == name) {
        //noinspection TypeScriptValidateTypes
        return this.resolver.resolveComponentFactory(component.component);
      }
    }

    console.log('Component not found: ' + name);
    return this.resolver.resolveComponentFactory(EmptyPlaceholderComponent)
  }


}
