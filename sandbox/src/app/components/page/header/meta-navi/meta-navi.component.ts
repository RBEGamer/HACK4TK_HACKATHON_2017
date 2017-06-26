import {Component, ElementRef, ViewEncapsulation} from "@angular/core";
import {ConfigurationService} from "../../../../services/configuration-service";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ucp-meta-navi',
  templateUrl: 'meta-navi.component.html',
  styleUrls: ['meta-navi.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('hotspotState', [
      state('void', style({
        'opacity': 0,
        transform: 'scale(0.7)'
      })),
      state('1', style({
        'opacity': 1,
        transform: 'scale(1.0)'
      })),
      transition('void <=> 1', animate('100ms ease-in'))
    ])
  ]
})
export class MetaNaviComponent extends DynamicComponentAbstract {

  configCollection: any;
  visible = false;

  constructor(protected configurationService: ConfigurationService, private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.prepareConfigCollection(this.configurationService);
  }

  prepareConfigCollection(configService: ConfigurationService) {
    configService.getProjectConfiguration().subscribe(response => {
      this.configCollection = response;
    });
  }

  toggle(event: Event) {
    console.log('toggle in header-standard')
    if (event) {
      event.stopPropagation();
    }

    if (!this.visible) {
      this.elementRef.nativeElement
        .dispatchEvent(new CustomEvent('hide-hotspots', {
          detail: false,
          bubbles: true
        }));
    }

    this.visible = !this.visible;
  }

}
