export class InputField {
  name: string;
  page: string; // use for wizards; visible only on given page
  visibleOnMatchObject: any; // match object to manage the visibility
  label: string;
  type: string;
  mandatory: boolean;
  errorText: string;
  validationExpression: string;
  selectItemList: any[];
  abbreviation: string;

  value: any;

  isText(): boolean {
    return this.type == "input"
  }

  isSelectBox(): boolean {
    return this.type == "select";
  }

  isCheckbox(): boolean {
    return this.type == "selectBoolean";
  }

  isRadioButton(): boolean {
    return this.type == "radio";

  }


}
