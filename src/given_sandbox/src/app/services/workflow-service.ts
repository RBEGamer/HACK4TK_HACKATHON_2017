import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {HttpService} from "./http-service";
import {Email} from "../Interfaces/email";
import {isNullOrUndefined} from "util";

const WORKFLOW_URL = "api/data/";

@Injectable()
export class WorkflowService {

  constructor(protected httpService: HttpService) {
  }

  startWorkflow(formName: string, formData: any, email?: Email ): Observable<any> {
    let workflowUrl = this.getWorkflowURL(formName);

    if (!isNullOrUndefined(email)) {
      formData['mail'] = email;
    }

    return this.httpService.performApiPostRequest(workflowUrl, formData)
      .map(response => response.body)
      .do((result) => {
        console.log("Created Workflow item", JSON.stringify(result));
        return result;
      })
  }



  private getWorkflowURL(formName: string): string {
    return WORKFLOW_URL +formName;
  }


}
