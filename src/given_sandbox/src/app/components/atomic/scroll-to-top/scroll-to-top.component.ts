import {Component, OnInit} from "@angular/core";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";
import {ConfigurationService} from "../../../services/configuration-service";

@Component({
  selector: 'ucp-scroll-to-top',
  templateUrl: 'scroll-to-top.component.html',
  styleUrls: ['scroll-to-top.component.css']
})

export class ScrollToTopComponent extends DynamicComponentAbstract implements OnInit {
  private label: string;

  constructor(protected configurationService: ConfigurationService) {
    super();

  }

  ngOnInit(): void {
    let sub = this.configurationService.getProjectConfiguration().subscribe(configurations => this.label = configurations.toTopLabel);
    this.detainedSubscriptions.push(sub);
  }

  scrollToTop() {
    const element = document.querySelector("#header");
    if (element) {
      element.scrollIntoView(element);
    }
    else {
      console.log('#header not found.');
    }
  }
}
