import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FormComponent} from "../../../../forms/form-component";
import {WorkflowService} from "../../../../services/workflow-service";
import {Email} from "../../../../Interfaces/email";

@Component({
  selector: 'ucp-brochure-order',
  templateUrl: 'brochure-order.component.html',
  styleUrls: ['brochure-order.component.css']
})

export class BrochureOrderComponent extends FormComponent implements OnInit {
  brochureOrderForm: FormGroup;
  newsletterForm: FormGroup;
  steps = 2;
  currentStep = 1;
  isButtonNewsletterClicked: boolean = false;



  constructor(private formBuilder: FormBuilder, private router: Router,private workflowService: WorkflowService) {
    super();
  }

  ngOnInit(): any {
    this.currentStep = 1;

    if (this.element.startWithImage) {

      this.currentStep = 0;
    }
    this.brochureOrderForm = this.formBuilder.group({});

    this.newsletterForm = this.formBuilder.group({
      'newsletter': ['', [Validators.required, this.checkboxMandatoryValidator]]
    });

  }


  nextStep() {
    if (this.isCurrentPageValid(this.currentStep, this.element.inputFieldList, this.brochureOrderForm)) {
      this.currentStep++;
    }
  }


  onOrder() {

    if (this.isCurrentPageValid(this.currentStep, this.element.inputFieldList, this.brochureOrderForm)) {

      let email = new Email(this.element.contactList, null, this.element.emailSubject);
      email.appendContentWithFormValues(this.element.inputFieldList, this.brochureOrderForm);

      this.workflowService.startWorkflow("brochure", this.brochureOrderForm.value, email).subscribe((data) => {
        this.nextStep();
      }, err => {
        this.message = this.element.errorMessage;
      });
    }

  }

  checkboxMandatoryValidator(control: FormControl): { [s: string]: boolean } {
    let valid = false;
    if (!control.valid || control.value == '' || control.value == 'false') {
      return {checkboxWrong: true};
    }
    else {
      return null;
    }
  }

  isNewsletterValid(): boolean {
    if (!this.newsletterForm.controls['newsletter'].valid || this.newsletterForm.controls['newsletter'].value == '' || this.newsletterForm.controls['newsletter'].value == 'false') {
      return false;
    }
    return true;

  }

  onNewsletterSubscribe() {
    if (!this.isNewsletterValid()) {
      this.newsletterForm.controls['newsletter'].markAsDirty();
    }
    else {
      this.isButtonNewsletterClicked = true;
    }
    // TODO: Newsletter
  }


}
