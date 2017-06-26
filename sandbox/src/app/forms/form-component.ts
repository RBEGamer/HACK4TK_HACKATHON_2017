import {InputField} from "../Interfaces/input-field";
import {FormGroup} from "@angular/forms";
import {DynamicComponentAbstract} from "../abstracts/dynamic-component-abstract";


export class FormComponent extends DynamicComponentAbstract {

  message;

  /**
   * Build a json object on the definition of the field in the given field list.
   * A checkbox field could have more than one checkboxes that leads to an json object with a sub object for a checkbox field.
   * @param name
   * @param val
   * @param fieldList
   * @param newJsonObject
   * @returns {any}
   */
  buildJsonObject(name: string, val: any, fieldList: InputField[], newJsonObject: any): any {
    let specialCaseSelectBoolean = false;
    for (var i = 0; i <= fieldList.length - 1; i++) {
      let field: InputField = Object.assign(new InputField(), fieldList[i]);
      if (field.isCheckbox() && name == field.name) {
        specialCaseSelectBoolean = true;
      }
    }
    // Fields of type selectBoolean build as a Form Group that is equals to a Subobject in JSON.
    if (specialCaseSelectBoolean) {
      let subJson = {};
      // Convention: a Field with more than one selected selectboxes is represented by a string separated by semicolon.
      var values = val.split(';');

      for (var i = 0; i <= values.length - 1; i++) {
        subJson[values[i]] = true;
      }

      newJsonObject[name] = subJson;
    }
    else {
      newJsonObject[name] = val;
    }
    return newJsonObject;
  }

  isCurrentPageValid(currentPage: any, inputFieldList: InputField[], currentForm: FormGroup): boolean {
    let validStep = true;

    for (var i = 0; i <= inputFieldList.length - 1; i++) {
      let fieldValid = this.isInputFieldValid(currentPage, inputFieldList[i], currentForm);

      if (!fieldValid) {
        validStep = fieldValid;
      }
    }

    if (!validStep) {
      console.log(this.getValidationMessage(currentPage, inputFieldList, currentForm));
    } else {
      this.message = undefined;
    }

    return validStep;
  }

  isInputFieldValid(currentPage: any, inputField: InputField, currentForm: FormGroup,): boolean {
    let validStep = true;

    if (currentPage) {
      if (inputField.page != currentPage) {
        return true;
      }
    }

    if (!currentForm.controls[inputField.name]) {
      return true;
    }

    if (currentForm.controls[inputField.name] instanceof FormGroup) {

      let controlGroup  = <FormGroup>currentForm.controls[inputField.name];

      let oneOfValid = false;
      Object.keys(controlGroup.controls).forEach(control => {
        let checkBoxControl = controlGroup.controls[control];

        checkBoxControl.markAsDirty();
        if (checkBoxControl.valid) {
          oneOfValid = true;
        }
      });
      if (!oneOfValid) {
        validStep = false;
      }
    } else if (!currentForm.controls[inputField.name].valid) {
      validStep = false;
      currentForm.controls[inputField.name].markAsDirty();
    }



    return validStep;

  }

  getInvalidFields(currentPage: any, inputFieldList: InputField[], currentForm: FormGroup): InputField[] {
    let invalidFields = [];
    let validStep = true;

    for (var i = 0; i <= inputFieldList.length - 1; i++) {

      if (!this.isInputFieldValid(currentPage, inputFieldList[i], currentForm)) {

        validStep = false;
        currentForm.controls[inputFieldList[i].name].markAsDirty();
        invalidFields.push(inputFieldList[i]);
      }

    }

    return invalidFields;
  }

  getValidationMessage(currentPage: any, inputFieldList: InputField[], currentForm: FormGroup): string {
    let errorMessage = [];
    this.getInvalidFields(currentPage, inputFieldList, currentForm).forEach(field => {
      errorMessage.push(field.label);
    })

    if (errorMessage.length > 0) {
      return "Not valid " + errorMessage.join(',');
    }

    return undefined;
  }


  /**
   * Return true if the json object in the attribute visibleOnMatchObject equals to the current form values
   * @param formFieldList
   * @param currentForm
   * @returns {boolean}
   */
  isVisibleOnMatch(field: InputField, formFieldList: InputField[], currentForm: FormGroup): boolean {
    field = Object.assign(new InputField(), field);
    if (field.visibleOnMatchObject) {
      let match = true;

      for (var i = 0; i <= formFieldList.length - 1; i++) {
        if (field.visibleOnMatchObject[formFieldList[i].name] && currentForm.controls[formFieldList[i].name]) {


          if (field.visibleOnMatchObject[formFieldList[i].name] != currentForm.controls[formFieldList[i].name].value) {
            match = false;
          }
        }
      }
      return match;
    }
    return true;
  }


  /**
   * Helper function to remove a element of an array.
   * @param array
   * @param element
   * @returns {boolean}
   */
  removeArrayElement(array: [any], element: any): boolean {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
      return true;
    }
    return false;
  }


  getFieldsOfPage(fields: [InputField], page: string): any[] {
    let filteredFields = fields.filter(item => item.page == page);
    return filteredFields;
  }
}
