import {Component, ComponentRef, Renderer2, ViewChild, ViewContainerRef} from "@angular/core";
import {ElementService} from "../../../services/element-service";


@Component({
  selector: 'content-right',
  styleUrls: ['standard.css'],
  templateUrl: 'content-right.template.html'
})
export class ContentRightComponent {
  //TODO clean cmpRefs if view disappears
  cmpRefs: ComponentRef<any>[];

  @ViewChild('includeContentArea', {read: ViewContainerRef})
  protected contentTarget: ViewContainerRef;

  @ViewChild('includeRightArea', {read: ViewContainerRef})
  protected rightTarget: ViewContainerRef;

  @ViewChild('includeStageArea', {read: ViewContainerRef})
  protected stageTarget: ViewContainerRef;

  @ViewChild('includeBottomArea', {read: ViewContainerRef})
  protected bottomTarget: ViewContainerRef;

  elements: any;
  page: any;

  constructor(protected elementService: ElementService,
              protected renderer: Renderer2) {
  }

  ngOnInit() {
    if (!this.elements) {
      console.log('no content');
      return;
    }
    if (typeof this.elements.stage != 'undefined') {
      this.addElementsToArea(this.elements.stage, this.stageTarget);
    }
    if (typeof this.elements.content != 'undefined') {
      this.addElementsToArea(this.elements.content, this.contentTarget);
    }
    if (typeof this.elements.right != 'undefined') {
      this.addElementsToArea(this.elements.right, this.rightTarget);
    }
    if (typeof this.elements['bottom-wide'] != 'undefined') {
      this.addElementsToArea(this.elements['bottom-wide'], this.bottomTarget);
    }
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
    let cmp = this.elementService
      .resolveComponent(element.className);

    let cmpRef: ComponentRef<any> = area.createComponent(cmp);
    cmpRef.instance.element = element.element;
    cmpRef.instance.className = element.className;
    cmpRef.instance.key = element.key;

    if (element.$el) {
      let container = <any>cmpRef.location.nativeElement;

      this.renderer.setStyle(container, 'display', 'block');

      if (element.$el) {
        for (let key in element.$el) {
          this.renderer.setAttribute(container, key, element.$el[key]);

        }
      }
    }

    return cmpRef;
  }
}
