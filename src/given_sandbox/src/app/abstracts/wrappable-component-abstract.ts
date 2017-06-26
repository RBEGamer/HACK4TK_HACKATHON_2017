import {DynamicComponentAbstract} from "./dynamic-component-abstract";
import {TemplateRef, ViewChild, ViewContainerRef} from "@angular/core";

/**
 * Any component which extends this class, needs a ViewContainerRef called 'ContentArea'
 * therefore you need to add an attribute to your template called "#contentArea" which
 * describes the viewContainer the content goes into if the link is wrapped around it.
 */
export class WrappableComponentAbstract extends DynamicComponentAbstract {

  @ViewChild('contentArea', {read: ViewContainerRef})
  protected contentArea: ViewContainerRef;

  wrapTemplate(templateRef: TemplateRef<any>) {
    this.contentArea.clear();
    this.contentArea.createEmbeddedView(templateRef);
  }
}
