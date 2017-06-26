import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormComponent} from "../../../../forms/form-component";
import {WorkflowService} from "../../../../services/workflow-service";
import {Email} from "../../../../Interfaces/email";


/**
 * UCP-1005 CTA-Kit Call-back service (14_03)
 * Created by ameister on 15.03.2017.
 */
@Component({
  selector: 'ucp-call-back-service',
  templateUrl: 'call-back-service.component.html',
  styleUrls: ['call-back-service.component.css']
})
export class CallBackServiceComponent extends FormComponent implements OnInit {
  callBackServiceForm: FormGroup;
  currentStep = 1;


  constructor(private formBuilder: FormBuilder, private workflowService: WorkflowService) {
    super();
  }

  ngOnInit(): any {
    this.callBackServiceForm = this.formBuilder.group({});
  }

  nextStep() {
    if (this.isCurrentPageValid(this.currentStep, this.element.inputFieldList, this.callBackServiceForm)) {
      this.currentStep++;
    }
  }

  onCallBackService() {
    if (this.isCurrentPageValid(this.currentStep, this.element.inputFieldList, this.callBackServiceForm)) {

      let email = new Email(this.element.contactList,null, this.element.emailSubject);
      email.appendContentWithFormValues(this.element.inputFieldList, this.callBackServiceForm);

      this.workflowService.startWorkflow("callback", this.callBackServiceForm.value, email).subscribe((data) => {
        this.nextStep();
      }, err => {
        this.message = this.element.errorMessage;
      });

    }

  }


}


