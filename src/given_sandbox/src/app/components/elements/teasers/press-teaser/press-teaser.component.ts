import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ContentService} from "../../../../services/content-service";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  moduleId: module.id,
  selector: 'press-teaser',
  templateUrl: 'press-teaser.component.html',
  styleUrls: ['press-teaser.css'],
  encapsulation: ViewEncapsulation.None
})
export class PressTeaserComponent extends DynamicComponentAbstract implements OnInit {
  private pressTeaserList: Array<any>;


  constructor(private contentService: ContentService) {
    super();
  }

  ngOnInit() {
    this.fetchPressTeasersList();
  }

  fetchPressTeasersList(query = 'sort_by=fs_date') {
    let sub = this.contentService.getPartialContent('press', query).subscribe(teaserList => {
      this.pressTeaserList = teaserList;
    });

    this.detainedSubscriptions.push(sub);
  }
}
