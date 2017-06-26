import {isNullOrUndefined} from "util";
import {InputField} from "./input-field";
export class Email {
  from?: string;
  to: string[];
  subject: string;
  content: string;

  constructor(to: string[], testEmails: string[], subject: string, content?: any) {
    this.to = to;
    if (!isNullOrUndefined(testEmails) && testEmails.length >0 ) {
      testEmails.forEach( next => to.push(next));
    }
    this.subject = subject;
    if (!isNullOrUndefined(content)) {
      this.content = content;
    }
  }

  appendContentWithFormValues(fieldList: InputField[], form: any) {
    let json = this.buildPrettyJson(fieldList, form);
    let identedText = JSON.stringify(json, null, 1);

    let re = /\{/gi;
    identedText = identedText.replace(re, "");
    re = /\}/gi;
    identedText = identedText.replace(re, "");
    re = /\"/gi;
    identedText = identedText.replace(re, "");
    re = /\:/gi;
    identedText = identedText.replace(re, " =");


    if (isNullOrUndefined(this.content)) {
      this.content = "<pre>" + identedText + "</pre>";
    } else {
      this.content.concat("<pre>" + identedText + "</pre>");
    }
  }

  buildPrettyJson(fieldList: InputField[], form: any): any {
    let newJsonObject = {};


    for (var i = 0; i <= fieldList.length - 1; i++) {
      let specialCaseSelectBoolean = false;
      let field: InputField = Object.assign(new InputField(), fieldList[i]);
      if (field.isCheckbox()) {
        specialCaseSelectBoolean = true;
      }
      let val = form.value[field.name];

      let label = fieldList[i].label;
      if (isNullOrUndefined(label) || label.length == 0) {
        label = fieldList[i].name;
      }

      // Fields of type selectBoolean build as a Form Group that is equals to a Subobject in JSON.
      if (specialCaseSelectBoolean) {
        let subJson = {};

        for (var j = 0; j <= field.selectItemList.length - 1; j++) {
          subJson[field.selectItemList[j].label] = val[field.selectItemList[j].value];
        }

        newJsonObject[label] = subJson;
      }
      else {
        newJsonObject[label] = val;
      }
    }
    return newJsonObject;
  }
}
