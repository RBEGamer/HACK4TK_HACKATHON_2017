import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {ComponentRegistry} from "../../../../../component-management/component-registry";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'include-components',
  templateUrl: 'include-components.component.html'
})
export class IncludeComponentsComponent extends DynamicComponentAbstract implements OnInit {
  @Input() elements;
  @Input() maxCount;
  @Input() componentsClass;
  @ViewChild('includeChildrenArea', {read: ViewContainerRef})
  protected childrenTarget: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {
    super();
  }

  ngOnInit() {
    // include happens over ngOnChanges.
    // It gets called right after the component is intialized.
  }

  private includeElements() {
    if (this.elements && Object.keys(this.elements).length !== 0) {
      if (this.elements instanceof Array && this.elements.length) {
        if (this.maxCount) {
          this.addElementsToArea(this.elements.slice(0, this.maxCount), this.childrenTarget);
        }
        else {
          this.addElementsToArea(this.elements, this.childrenTarget)
        }
      }
      else {
        this.addElement(this.elements, this.childrenTarget);
      }
    }
    else {
      console.log('no elements for dynamic')
    }
  }

  ngOnChanges() {
    this.childrenTarget.clear();
    this.includeElements();
  }

  addElementsToArea(elementsList: any[], area: ViewContainerRef) {
    if (!elementsList || elementsList.length < 1) {
      return;
    }

    let key = 0;
    for (let element of elementsList) {
      this.addElement(element, area, key++);

    }
  };

  addElement(element: any, area: ViewContainerRef, index: number = null): any {
    if (typeof element.className == 'undefined') {
      return;
    }

    let component = ComponentRegistry.getComponentByName(element.className);
    let cmp = this.resolver.resolveComponentFactory(component);

    let cmpRef: ComponentRef<any> = area.createComponent(cmp);
    cmpRef.instance.element = element.element;
    cmpRef.instance.className = element.className;
    cmpRef.instance.indexInList = index;

  }
}
