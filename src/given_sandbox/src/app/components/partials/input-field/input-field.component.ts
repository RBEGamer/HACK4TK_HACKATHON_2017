import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {InputField} from "../../../Interfaces/input-field";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'ucp-input-field',
  templateUrl: 'input-field.component.html',
  styleUrls: ['input-field.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InputFieldComponent extends DynamicComponentAbstract implements OnInit {

  visibleSelectItemFields = [];
  label: any;

  /**
   *  "page" : 1,
   *  "name": "name",
   *  "label": "Name, Vorname",
   *  "type": "input",
   *  "mandatory": true,
   *  "validationExpression": "",
   *  "errorText" : "Bitte Namen, Vorname eingeben"
   */
  @Input()
  field: InputField;

  @Input()
  parentForm: FormGroup;

  @Input()
  defaultErrorText: string;

  @Input()
  showMandatory = false;

  @Output() valueChange: EventEmitter<InputField> = new EventEmitter<InputField>();

  ngOnInit() {
    this.field = Object.assign(new InputField(), this.field);

    var validators: ValidatorFn[] = [];
    if (this.field.mandatory) {
      validators.push(Validators.required);
    }

    if (this.field.validationExpression) {
      validators.push(Validators.pattern(this.field.validationExpression));
    }


    let intializeValueChangeListener = true;

    if (this.field.isText()) {
      this.parentForm.addControl(this.field.name, new FormControl('', Validators.compose(validators)));
    }
    else if (this.field.isRadioButton()) {
      this.parentForm.addControl(this.field.name, new FormControl(this.field.selectItemList[0].value, Validators.compose(validators)));
    }
    else if (this.field.isCheckbox()) {

      if (this.field.mandatory) {
        validators.push(this.checkboxMandatoryValidator);
      }

      this.parentForm.addControl(this.field.name, new FormGroup({},this.checkboxOneSelectedValidator));


      for (var j = 0; j <= this.field.selectItemList.length - 1; j++) {
        (<FormGroup>this.parentForm.controls[this.field.name]).addControl(this.field.selectItemList[j].value, new FormControl('', Validators.compose(validators)));

        if (intializeValueChangeListener) {
          this.registerValueChangeListener(<FormControl>(<FormGroup>this.parentForm.controls[this.field.name]).controls[this.field.selectItemList[j].value]);
        }
      }
      if (intializeValueChangeListener) {
        // no duplicated registration
        intializeValueChangeListener = false;
      }
    }
    else if (this.field.isSelectBox()) {
      this.parentForm.addControl(this.field.name, new FormControl(this.field.selectItemList[0].value, Validators.compose(validators)));
    }

    if (intializeValueChangeListener) {
      this.registerValueChangeListener(<FormControl>this.parentForm.controls[this.field.name]);
    }
  }


  registerValueChangeListener(formControl: FormControl) {
    formControl.valueChanges
      .debounceTime(400)
      .subscribe(data => {
        this.field.value = data;
        this.valueChange.emit(this.field);
      });
  }

  checkboxMandatoryValidator(control: FormControl): { [s: string]: boolean } {
    let valid = false;
    if (!control.valid || control.value == '' || control.value === 'false') {
      return {checkboxWrong: true};
    }
    else {
      return null;
    }
  }

  checkboxOneSelectedValidator(controlGroup: FormGroup): ValidatorFn {
    let oneValid = false;

    Object.keys(controlGroup.controls).forEach(control => {
      let checkBoxControl = controlGroup.controls[control];

      if (checkBoxControl.valid) {
        oneValid = true;
      }
    });


    return (control: AbstractControl): { [key: string]: any } => {
      return !oneValid ? {'missingSelection': 'false'} : null;
    };
  }

  /**
   * Gets json field configuration by id to check mandatory
   * @param id
   * @returns {any}
   */
  isMandatory(field: any): any {
    if (field.mandatory) {
      return true;
    }
    return false;
  }

  /**
   * Translate the value by the json field configuration.
   * @param name
   * @returns {any}
   */
  getValueLabel(name: string): string {
    let formfield = this.parentForm.controls[name];

    let value = (formfield) ? (<FormControl>formfield).value : name;
    let selectItem = this.field.selectItemList.length ? this.field.selectItemList[0] : undefined;
    if (value) {
       selectItem = this.field.selectItemList.filter(item => item.value == value)[0];
    }

    return selectItem ? selectItem.label : value;

  }


  /**
   * Sets a value into the form control
   * @param name
   * @param value
   */
  setValue(name: string, value: string) {
    let field = this.parentForm.get(name);
    if (field) {
      (<FormControl>field).setValue(value);
    }
    this.visibleSelectItemFields[name] = false;
  }


  toggleVisibility(name: string, event?: any) {
    if (isNullOrUndefined(this.visibleSelectItemFields[name])) {
      this.visibleSelectItemFields[name] = true;
    }
    else {
      this.visibleSelectItemFields[name] = !this.visibleSelectItemFields[name];
    }
  }


  hideVisibility(name: string, event?: any) {
/*
    if (event) {
      if ( event.target &&  event.target.id == name) {
      } else {
      }
    }
*/
    this.visibleSelectItemFields[name] = false;

  }


  isVisible(name: string): boolean {
    return this.visibleSelectItemFields[name];
  }

  /**
   * A field is valid, if untouched or has a valid value;
   * @param field
   * @returns {boolean}
   */
   isValid(field: any) {
    if (this.field.isCheckbox()) {
      let hasOneDirtyCheckbox = false;

      let oneValid = false;
      let allUntouched = true;

      this.field.selectItemList.forEach(item => {
        let control = (<FormGroup>this.parentForm.controls[this.field.name]).controls[item.value];
        if (control && (control.valid) ) {
          oneValid = true;
        }
        if (control.dirty) {
          allUntouched = false;
        }
      });

      if (oneValid || (!oneValid && allUntouched)) {
        return true;
      }
      return false;
    } else if (this.parentForm.controls[field.name]) {
      return this.parentForm.controls[field.name].valid || !this.parentForm.controls[field.name].dirty;
    }
    return true;
  }


  /**
   * Returns a default error message if undefined.
   * @param field
   * @returns {string}
   */
  getErrorMessage(field: any): string {
    let formfield = this.parentForm.get(field.name);
    let value = (formfield) ? (<FormControl>formfield).value : undefined;

    let error = field.errorText ? field.errorText : this.defaultErrorText;
    if (value && value.length > 0) {
      error = field.errorFormatText ? field.errorFormatText : error;
    }
    return error;
  }


}
