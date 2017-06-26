import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({selector: '[ucpIsEmpty]'})
export class IsEmptyDirective {
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input() set ucpIsEmpty(testElement: any) {

    if (this.isEmpty(testElement) && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.isEmpty(testElement) && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  private isEmpty(testElement: any) {
    return !testElement || Object.keys(testElement).length == 0;
  }
}
