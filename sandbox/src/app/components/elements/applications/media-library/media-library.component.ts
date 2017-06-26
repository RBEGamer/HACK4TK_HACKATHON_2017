import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContentService} from "../../../../services/content-service";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import objectFitImages from 'object-fit-images';

@Component({
  selector: 'media-library',
  templateUrl: 'media-library.component.html',
  styleUrls: ['media-library.component.css']
})
export class MediaLibraryComponent extends DynamicComponentAbstract implements OnInit {
  private myForm: FormGroup;
  private teaserList: any;

  constructor(private formBuilder: FormBuilder, private contentService: ContentService) {
    super();

  }

  ngOnInit(): any {
    this.myForm = this.formBuilder.group({});

    this.fetchMediaEntries();
  }

  onSearch() {

  }


  fetchMediaEntries(query = 'sort_by=fs_date') {
    let sub = this.contentService.getPartialContent('media_library', query).first().subscribe(teaserList => {
      this.teaserList = teaserList;
    });

    window.addEventListener('load', function() {
      objectFitImages('.media-center-element img');
    });
  }

}


