import {Component, ElementRef} from "@angular/core";
import {ConfigurationService} from "../../../services/configuration-service";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'ucp-header-standard',
  templateUrl: 'header-standard.component.html',
  styleUrls: ['header-standard.component.css']
})
export class HeaderStandardComponent extends DynamicComponentAbstract {

  configCollection: any;
  visible = false;

  constructor(protected configurationService: ConfigurationService) {
    super();
  }

  ngOnInit() {
    this.prepareConfigCollection();
  }

  prepareConfigCollection() {
    this.configurationService.getProjectConfiguration().subscribe(response => {
      this.configCollection = response;
    });
  }
}
