import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {IntranetService} from "../../../../services/intranet-service";
import {InputField} from "../../../../Interfaces/input-field";
import {FormComponent} from "../../../../forms/form-component";

@Component({
  selector: 'ucp-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SettingsComponent extends FormComponent implements OnInit  {
  settingsForm: FormGroup;
  currentPage: string;


  userSettings;


  constructor(private formBuilder: FormBuilder, private intranetService: IntranetService) {
    super();
  }


  ngOnInit(): any {
    this.currentPage = "";
    this.settingsForm = this.formBuilder.group({});

    let observable: Observable<any> = this.intranetService.performGetReguest("settings");

    observable.subscribe(response => {
        let userData = response.body;
        if (userData) {
          this.userSettings = userData.settings;

          let updatedJsonObject = {};
          for (var i = 0; i <= this.userSettings.length - 1; i++) {
            updatedJsonObject = this.buildJsonObject(this.userSettings[i].name, this.userSettings[i].value, this.element.settingsFieldList, updatedJsonObject);

          }
          this.settingsForm.patchValue(updatedJsonObject);

        } else {
          console.log("No user settings found");
        }

      }
    );


  }

  onValueChange(changedField: InputField) {
    /*
    if (changedField.value != "undefined")
    {
      if (changedField.name = "businessArea") {
        console.log("JA");
        if (this.settingsForm.controls["businessUnit"]) {
          console.log("JA");
          (<FormControl>this.settingsForm.controls["businessUnit"]).setValue("undefined");
        }
        if (this.settingsForm.controls["operatingUnit"]) {
          (<FormControl>this.settingsForm.controls["operatingUnit"]).setValue("undefined");
        }

      } else if (changedField.name = "businessUnit") {
        if (this.settingsForm.controls["operatingUnit"]) {
          (<FormControl>this.settingsForm.controls["operatingUnit"]).setValue("undefined");
        }
      }
    }
    */
  }


  isVisible(field : InputField): boolean {
    return this.isVisibleOnMatch(field, this.element.settingsFieldList, this.settingsForm);
  }

  getSelectionAsString(): string {
    return "test";
  }


  onSaveSettings() {
    if (this.isCurrentPageValid(this.currentPage,this.element.settingsFieldList,this.settingsForm )) {
      console.log(this.settingsForm);

      let newUserData = {
        "settings": []
      }


      /**
       * Build structure:
       "userId": "234",
       "settings": [
       {
         "name": "businessArea",
         "settingCategory" : "personalization",
         "value": "Components Technology"
       },

       ]
       */

      for (var i = 0; i <= this.element.settingsFieldList.length - 1; i++) {

        newUserData['settings'].push({
          "name": this.element.settingsFieldList.name,
          "value": (<FormControl>this.settingsForm.controls[this.element.settingsFieldList[i].name]).value,
          "settingsCategory": this.element.settingsCategory
        });

      }

      this.intranetService.performPostRequest("updateSettings", newUserData).subscribe(response => {
        // do nothing
      });

    }

  }


}
