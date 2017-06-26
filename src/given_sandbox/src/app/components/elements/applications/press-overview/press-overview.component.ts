import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {ContentService} from "../../../../services/content-service";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-press-overview',
  templateUrl: 'press-overview.component.html',
  styleUrls: ['press-overview.component.css']
})

export class PressOverviewComponent extends DynamicComponentAbstract implements OnInit {
  form: FormGroup;
  pressTeaserList: Array<any>;

  constructor(private formBuilder: FormBuilder, private contentService: ContentService) {
    super();
  }

  ngOnInit(): any {
    this.form = this.formBuilder.group({});

    this.fetchPressTeasersList();
  }

  reset() {
    this.fetchPressTeasersList();

    Object.keys(this.form.controls).forEach(key => {
      let item: AbstractControl = this.form.get(key);
      if (item.value != '') {
        item.setValue('');
      }
    })

  }

  protected filters = {
    'category': (category) => {
      return `{'element.categoryList':{'$in':['${category}']}}`;
    },
    'year': (year) => {
      return `{'element.year':'${year}'}`;
    },
    'topic': (topic) => {
      return `{'element.topicList':{'$in':['${topic}']}}`;
    }
  };

  updateList(field: any) {
    let filters = [];
    Object.keys(this.form.controls).forEach(key => {
      let item: AbstractControl = this.form.get(key);
      if (!!item.value && item.touched && this.filters[key]) {
        filters.push(this.filters[key](item.value));
      }
    });

    this.getFilteredTeasersList(filters);
  }

  getFilteredTeasersList(filters: Array<string>) {
    if (filters.length) {
      // multiple filters:
      // ?filter={'$and':[{'title': {'$regex':'(?i)^STAR TREK.*'}, {'publishing_date':{'$gte':{'$date':'2015-09-04T08:00:00Z'}}}]}
      let allFilters = filters.join(','),
        query = `filter={'$and':[${allFilters}]}`;

      console.log('filtering press teasers', query);
      this.fetchPressTeasersList(query);
    }
  }

  fetchPressTeasersList(query = 'sort_by=fs_date') {
    let sub = this.contentService.getPartialContent('press', query)
      .subscribe(teaserList => {
        this.pressTeaserList = teaserList;
      });

    this.detainedSubscriptions.push(sub);
  }
}


