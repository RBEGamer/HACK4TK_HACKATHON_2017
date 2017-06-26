import {Component, ElementRef, Renderer2} from "@angular/core";
import "rxjs/add/operator/map";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {PlatformService} from "../../../../../system/platform.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ucp-ekomi-widget',
  templateUrl: 'ekomi-widget.component.html',
  styleUrls: ['ekomi-widget.component.css']
})
export class EkomiWidgetComponent extends DynamicComponentAbstract {

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              private platformService: PlatformService) {
    super();
  }

  ngOnInit() {
    if (!!this.element.ekomiId) {
      let script = this.renderer.createElement('script');

      try {
        // Include ekomi-Config in document, only in browser since we need access to the window object...
        if (this.platformService.isBrowser()) {
          Observable.timer(100).subscribe(x => {
            (<any>window).eKomiIntegrationConfig = [{certId: this.element.ekomiId}];

            this.renderer.setAttribute(script, 'type', 'text/javascript');
            this.renderer.setAttribute(script, 'src', 'https://connect.ekomi.de/integration_1487948081/' + this.element.ekomiId + '.js');
            this.renderer.appendChild(this.elementRef.nativeElement, script);
          });


        }
      }
      catch (e) {
        console.error('cant include ekomi widget', e);
      }
    }
  }
}
