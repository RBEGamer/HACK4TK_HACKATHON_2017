import {Component, OnInit} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {ContentService} from "../../../../services/content-service";

@Component({
  selector: 'event-teaser',
  templateUrl: 'event-teaser.component.html',
  styleUrls: ['event-teaser.css']
})
export class EventTeaserComponent extends DynamicComponentAbstract implements OnInit {
  private eventTeaserList: Array<any>;


  constructor(private contentService: ContentService) {
    super();
  }

  ngOnInit() {
    if (this.element.loadEventsFromDatasource) {
      this.fetchEventTeasersList();
    }
  }

  fetchEventTeasersList(query = 'sort_by=fs_date') {
    let sub = this.contentService.getPartialContent('event', query).subscribe(teaserList => {
      this.eventTeaserList = teaserList;
    });
  }
}
