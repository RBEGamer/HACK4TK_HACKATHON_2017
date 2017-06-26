import {ComponentFactoryResolver, ComponentRef, Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";
import {ComponentRegistry} from "../../component-management/component-registry";
import {WrappableComponentAbstract} from "../abstracts/wrappable-component-abstract";


@Directive({selector: '[wrapInComponentIfExists]'})
export class WrapInComponentIfExistsDirective {
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private resolver: ComponentFactoryResolver) {
  }

  //noinspection JSUnusedGlobalSymbols
  @Input() set wrapInComponentIfExists(link: any) {
    // if no link is present, just render as is!
    if (!link || Object.keys(link).length === 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }

    // the interesting part
    else {
      this.addElementToViewContainer(link, this.viewContainer);
    }
  }

  addElementToViewContainer(element: any, area: ViewContainerRef) {
    let component = ComponentRegistry.getComponentByName(element.className),
      componentFactory = this.resolver.resolveComponentFactory(component),
      cmpRef: ComponentRef<WrappableComponentAbstract> = area.createComponent(componentFactory);

    cmpRef.instance.element = element.element;
    cmpRef.instance.className = element.className;
    cmpRef.instance.wrapTemplate(this.templateRef);

    return cmpRef;
  }

}
