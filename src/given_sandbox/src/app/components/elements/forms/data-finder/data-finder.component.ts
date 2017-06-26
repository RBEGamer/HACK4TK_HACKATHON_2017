import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {FormComponent} from "../../../../forms/form-component";
import {DataFinderService} from "../../../../services/data-finder-service";

@Component({
  selector: 'ucp-data-finder',
  templateUrl: 'data-finder.component.html',
  styleUrls: ['data-finder.component.css']
})
export class DataFinderComponent extends FormComponent implements OnInit {
  finderForm: FormGroup;
  message;
  result;

  constructor(private formBuilder: FormBuilder, private router: Router, private dataFinderService: DataFinderService) {
    super();
  }

  ngOnInit(): any {
    this.finderForm = this.formBuilder.group({});
  }

  onSend() {
    if (this.isCurrentPageValid(undefined, this.element.filterFieldList, this.finderForm)) {

      this.dataFinderService.find("contact","" ).subscribe((data) => {
        this.result =  [];
        data.forEach(next => this.result.push(JSON.stringify(next)));
      }, err => {
        this.result = this.element.noResultMessage;
      });

    }

  }

}
