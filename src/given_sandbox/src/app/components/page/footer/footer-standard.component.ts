import {Component} from "@angular/core";
import {ConfigurationService} from "../../../services/configuration-service";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-footer-standard',
  templateUrl: 'footer-standard.component.html',
  styleUrls: ['footer-standard.component.css']
})
export class FooterStandardComponent extends DynamicComponentAbstract {

  configCollectionFooter: any;
  configCollection: any;

  constructor(protected configurationService: ConfigurationService) {
    super();
  }

  ngOnInit() {
    this.prepareConfigCollection(this.configurationService);
  }

  prepareConfigCollection(configService: ConfigurationService) {
    configService.getFooter().first().subscribe(response => {
      this.configCollectionFooter = response;
    });
    configService.getProjectConfiguration().first().subscribe(response => {
      this.configCollection = response;
    });
  }

}
