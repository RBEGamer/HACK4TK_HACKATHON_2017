import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";

@Directive({selector: '[ucpIsset]'})
export class IssetDirective {
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input() set ucpIsset(testElement: any) {
    if (this.validate(testElement) && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
    else if (this.validate(testElement) && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  private validate(testElement: any) {
    return !!testElement && Object.keys(testElement).length > 0;
  }
}
