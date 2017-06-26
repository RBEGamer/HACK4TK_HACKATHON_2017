import {Component, ElementRef, Renderer2} from "@angular/core";
import "rxjs/add/operator/map";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-tk-jira-issue-reporter-widget',
  templateUrl: 'tk-jira-issue-reporter-widget.component.html',
  styleUrls: ['tk-jira-issue-reporter-widget.component.css']
})
export class TkJiraIssueReporterWidgetComponent extends DynamicComponentAbstract {

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {

    if (!!this.element.collectorId) {
      let script = this.renderer.createElement('script');

      try {
        this.renderer.setAttribute(script, 'type', 'text/javascript');
        this.renderer.setAttribute(script, 'src', 'https://tkjira.thyssenkrupp.com/s/88392f285273cd36f0b3b618a27a26d3-T/xcm8io/73017/efeb98d728b8208d1f91cdad9fe3e7e5/2.0.23/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-UK&collectorId=' + this.element.collectorId);
        this.renderer.appendChild(this.elementRef.nativeElement, script);
      }
      catch (e) {
        console.error('cant include tk-jira-issue-collector widget', e);
      }
    }
  }
}
