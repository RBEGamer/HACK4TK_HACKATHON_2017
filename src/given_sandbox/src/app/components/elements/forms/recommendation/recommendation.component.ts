import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FormComponent} from "../../../../forms/form-component";
import {WorkflowService} from "../../../../services/workflow-service";
import {Email} from "../../../../Interfaces/email";

@Component({
  selector: 'ucp-recommendation',
  templateUrl: 'recommendation.component.html',
  styleUrls: ['recommendation.component.css']
})

export class RecommendationComponent extends FormComponent implements OnInit {
  recommendationForm: FormGroup;
  steps = 2;
  currentStep = 1;


  constructor(private formBuilder: FormBuilder, private router: Router, private workflowService: WorkflowService) {
    super();
  }

  ngOnInit(): any {
    this.currentStep = 1;

    if (this.element.startWithImage) {
      this.currentStep = 0;
    }
    this.recommendationForm = this.formBuilder.group({});
  }


  nextStep() {
    if (this.isCurrentPageValid(this.currentStep, this.element.inputFieldList, this.recommendationForm)) {
      this.currentStep++;
    }
  }


  onRecommendation() {

    if (this.isCurrentPageValid(this.currentStep, this.element.inputFieldList, this.recommendationForm)) {

      let email = new Email(this.element.contactList,null, this.element.emailSubject);
      email.appendContentWithFormValues(this.element.inputFieldList, this.recommendationForm);

      this.workflowService.startWorkflow("recommendation", this.recommendationForm.value, email).subscribe((data) => {
        this.nextStep();
      }, err => {
        this.message = this.element.errorMessage;
      });
    }

  }

}
