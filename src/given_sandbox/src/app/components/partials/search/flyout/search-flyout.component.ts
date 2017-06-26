import {Component, Input, ViewEncapsulation} from "@angular/core";
import {ContentService} from "../../../../services/content-service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'search-flyout',
  templateUrl: 'search-flyout.component.html',
  styleUrls: ['search-flyout.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('visibleState', [
      state('visible', style({
        height: '*',
        visibility: 'visible',
        overflow: 'visible'
      })),
      state('hidden', style({
        height: 0,
        visibility: 'hidden',
        overflow: 'hidden'
      })),
      transition('* => visible', animate('300ms ease-in-out')),
      transition('visible => hidden', animate('300ms ease-in-out'))
    ])
  ]

})
export class SearchFlyoutComponent extends DynamicComponentAbstract {
  @Input()
  state = 'hidden';

  results: Array<any>;

  @Input()
  keyword: string;

  constructor(private contentService: ContentService) {
    super();
  }

  resetSearch() {
    this.results = [];
    this.state = 'hidden';
    this.keyword = '';
  }

  performSearch() {
    if (!this.keyword) {
      this.results = [];
      return;
    }
    if (this.keyword.length < 2) {
      return;
    }

    let sub = this.contentService.getPagesBySearchKeyword(this.keyword).subscribe((pages) => {
      console.log('search Results found:', pages.body._returned);
      if (pages.body._returned > 0) {
        this.results = pages.body._embedded['rh:doc'].slice(0, 10);
      }
      else {
        this.results = [];
      }
    });

    this.detainedSubscriptions.push(sub);
  }
}
