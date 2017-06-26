import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormComponent} from "../../../../forms/form-component";
import {WorkflowService} from "../../../../services/workflow-service";
import {isNullOrUndefined} from "util";
import {Email} from "../../../../Interfaces/email";

@Component({
  selector: 'ucp-general-contact',
  templateUrl: 'general-contact.component.html',
  styleUrls: ['general-contact.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralContactComponent extends FormComponent implements OnInit {

  currentStep: number;

  generalContactForm: FormGroup;

  showErrorSendData: boolean;

  constructor(private formBuilder: FormBuilder, private workflowService: WorkflowService) {
    super();
  }

  ngOnInit() {
    this.generalContactForm = this.formBuilder.group({});
    this.currentStep = 1;
    this.showErrorSendData = false;
  }

  onButtonNextClicked() {
    if (this.isCurrentPageValid(this.currentStep, this.element.inputFieldList, this.generalContactForm)) {
      this.currentStep++;
      // jump over step two in case of general light
      if (!isNullOrUndefined(this.element.formLight) && this.element.formLight) {
        this.currentStep = 3;
      }
    }
  }

  onButtonOrderClicked() {
    if (this.isCurrentPageValid(this.currentStep, this.element.inputFieldList, this.generalContactForm)) {
      let workflowName = "generalContact";
      if (!isNullOrUndefined(this.element.formLight) && this.element.formLight) {
        workflowName = "generalContactLight";
      }

      let email = new Email(this.element.contactList,null, this.element.emailSubject);
      email.appendContentWithFormValues(this.element.inputFieldList, this.generalContactForm);

      this.workflowService.startWorkflow(workflowName, this.generalContactForm.value, email).subscribe((data) => {
        this.currentStep++;
      }, err => {
        this.showErrorSendData = true;
        this.message = this.element.errorMessage;
      });
    }
  }

}


