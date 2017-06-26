import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {FormComponent} from "../../../../forms/form-component";
import {WorkflowService} from "../../../../services/workflow-service";
import {Email} from "../../../../Interfaces/email";

@Component({
  selector: 'ucp-contact-form',
  templateUrl: 'contact-form.component.html',
  styleUrls: ['contact-form.component.css']
})
export class ContactFormComponent extends FormComponent implements OnInit {
  contactForm: FormGroup;
  visibleSelectItemFields = [];
  message;

  constructor(private formBuilder: FormBuilder, private router: Router, private workflowService: WorkflowService) {
    super();
  }

  ngOnInit(): any {
    this.contactForm = this.formBuilder.group({});
  }

  onSend() {
    if (this.isCurrentPageValid(undefined, this.element.inputFieldList, this.contactForm)) {

      let email = new Email(this.element.contactList, this.getTopicEmails(), this.element.emailSubject);
      email.appendContentWithFormValues(this.element.inputFieldList, this.contactForm);

      this.workflowService.startWorkflow("contact", this.contactForm.value, email).subscribe((data) => {
        if (this.element.successPage) {
          this.router.navigate(['/' + this.element.successPage]);
        }
      }, err => {
        this.message = this.element.errorMessage;
        /*
         if (this.element.errorPage) {
         this.router.navigate(['/' + this.element.errorPage]);
         }
         */
      });

    }

  }

  getTopicEmails() : any[] {
    let value = this.contactForm.value["topic"];

    if (value) {
      let inputField = this.element.inputFieldList.filter(next => next.name == 'topic');

      if (inputField[0]) {
        let selectItem = inputField[0].selectItemList.filter(next => next.value == value);

        if (selectItem[0]) {

          return selectItem[0].contactList;
        }
      }
    }
    return null;
  }

}
