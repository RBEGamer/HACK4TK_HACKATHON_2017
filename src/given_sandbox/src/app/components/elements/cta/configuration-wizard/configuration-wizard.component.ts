import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-configuration-wizard',
  templateUrl: 'configuration-wizard.component.html',
  styleUrls: ['configuration-wizard.component.css']
})
export class ConfigurationWizardComponent extends DynamicComponentAbstract implements OnInit {
  currentStep: number = 0;
  inputStep: number = 0;
  resultList: Array<string> = [];

  private wizardForm: FormGroup;
  private newsletterForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): any {
    this.wizardForm = this.formBuilder.group({
      'privacy': ['', Validators.required]
    });

    this.newsletterForm = this.formBuilder.group({
      'newsletter': ['', Validators.required]
    });
  }

  getTopic(step: number): any {
    return this.element.topicList.find(topic => topic.topicPosition == step) || {};
  }

  changeCurrentStep(selectedId: string): void {
    this.currentStep += 1;
    this.resultList.push(selectedId);
    if (this.currentStep == this.element.topicList.length) {
      this.inputStep = 1;
    }
  }

  nextStep() {
    if (this.isCurrentPageValid()) {
      this.inputStep++;
    }
  }

  isCurrentPageValid(): boolean {
    let validStep = true;
    for (let field of this.element.inputFieldList) {
      if (field.page == this.inputStep) {
        if (!this.wizardForm.controls[field.name].valid) {
          validStep = false;
          this.wizardForm.controls[field.name].markAsDirty();
        }
      }
    }
    return validStep;
  }

  onWizard() {
    if (this.isCurrentPageValid()) {
      //TODO: UCP-181 What must be happen with the result ids? mm-> open point
      console.log('ConfigurationWizardComponent->onWizard->Possible product ' + this.getProductNameByIds(this.resultList));
      console.log(this.wizardForm);
      this.nextStep();
    }
  }

  getProductNameByIds(resultList: Array<string>): string {
    for (let product of this.element.productList) {
      let getItCount: number = 0;
      for (let attr of product.productAttributeList) {
        for (let resultId of resultList) {
          if (attr.productAttributeId == resultId) {
            getItCount++;
            if (getItCount == resultList.length) {
              return product.productName;
            }
            break;
          }
        }
      }
    }
    console.log('ConfigurationWizardComponent->getProductNameByIds->No product name was found!');
    return '';
  }
}
