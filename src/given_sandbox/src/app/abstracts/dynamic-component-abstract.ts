import {HostBinding, Input, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";
export class DynamicComponentAbstract implements OnDestroy {
  element: any;
  className: string;
  indexInList: number = null;

  protected detainedSubscriptions: Subscription[] = [];

  ngOnDestroy() {
    if (this.detainedSubscriptions.length) {
      for (let sub of this.detainedSubscriptions) {
        sub.unsubscribe();
      }
    }
  }
}
