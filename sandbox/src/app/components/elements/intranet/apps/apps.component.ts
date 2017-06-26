import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {IntranetService} from "../../../../services/intranet-service";
import {Observable} from "rxjs";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";

@Component({
  selector: 'ucp-apps',
  templateUrl: 'apps.component.html',
  styleUrls: ['apps.component.css']
})
export class AppsComponent extends DynamicComponentAbstract implements OnInit {

  myApps: any[];

  editModus: boolean;
  appsForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private intranetService: IntranetService) {
    super();
  }


  /**
   *
   */

  ngOnInit(): any {
    this.editModus = false;

    this.appsForm = this.formBuilder.group({});

    let observable: Observable<any> = this.intranetService.performGetReguest("apps");

    observable.subscribe(response => {
      let userData = response.body;
      this.buildForm(userData);
    });
  }

  buildForm(userData: any, createForm?: boolean) {

    this.myApps = [];

    /**
     "userId": "234",
     "apps": [
     {
       "appId": "1",
       "name": "bookit",
       "category": {
         "categoryId": "666",
         "name": "business",
         "apps": []
       }
     }
     ]
     */
    if (userData && userData.apps) {
      // for each user selected category
      for (var j = 0; j <= userData.apps.length - 1; j++) {

        /**
         * CMS-Definition:
         * {
                  "category": "business",
                  "name": "ami",
                  "label": "AMI",
                  "link": {
                    "className": "link-external",
                    "element": {
                      "link": "https://ami.tknet.thyssenkrupp.com/amiwb/",
                      "text": "ami",
                      "follow": "true",
                      "target": "_blank"
                    }
                  },
                  "url": "https://ami.tknet.thyssenkrupp.com/amiwb/",
                  "image": {
                    "source": "../assets.src/thyssenkrupp_p_4_0x0_de.jpg",
                    "altText": "AMI",
                    "title": "AMI"
                  }
                },
         */
        let appDefinition = this.getAppDefinition(userData.apps[j].category.name, userData.apps[j].name);
        if (appDefinition) {
          this.myApps.push(appDefinition);
          console.log("Add App from User " + userData.apps[j]);
          this.appsForm.addControl(appDefinition.name, new FormControl(''));
        }
        else {
          console.log("Remove App from User " + userData.apps[j]);
        }

      }

    }
  }

  getAppDefinition(categoryName: string, applicationName: string): any {
    for (var j = 0; j <= this.element.appList.length - 1; j++) {

      if (this.element.appList[j].category == categoryName && this.element.appList[j].name == applicationName) {
        return this.element.appList[j];
      }
    }
    return null;
  }


  switchToEditModus() {
    this.editModus = true;
  }

  onCancel() {
    this.editModus = false;
  }

  onDelete() {
    this.editModus = false;

    let newUserData = {
      "apps": []
    }


    /**
     * Build structure:
     "userId": "234",
     "apps": [
     {
       "appId": "1",
       "name": "bookit",
       "category": {
         "categoryId": "666",
         "name": "business",
         "apps": []
       }
     }
     ]
     */

    for (var i = 0; i <= this.myApps.length - 1; i++) {
      if (!((<FormControl>this.appsForm.controls[this.myApps[i].name]).value)) {
        newUserData['apps'].push({
          "appId": i,
          "name": this.myApps[i].name,
          "category": {
            "categoryId": this.myApps[i].categoryId,
            "name": this.myApps[i].category
          }
        });
      }

      this.appsForm.removeControl(this.myApps[i].name);

    }

    this.intranetService.performPostRequest("updateApps", newUserData).subscribe(response => {
      // Refresh form
      if (response.body) {
        this.buildForm(response.body, true);
      }
    });


  }

  onSave() {
    this.editModus = false;
  }


}
