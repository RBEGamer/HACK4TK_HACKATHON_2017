import {Component, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {TimeDifference} from "../../../../interfaces/time-difference";
import {ExpirationTime} from "../../../../interfaces/expiration-time";
import {PlatformService} from "../../../../../system/platform.service";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";


@Component({
  selector: 'countdown-teaser',
  templateUrl: 'countdown-teaser.component.html',
  styleUrls: ['countdown-teaser.component.css']
})
export class CountdownTeaserComponent extends DynamicComponentAbstract implements OnInit {
  @Input()
  element: any;
  timeDifference: TimeDifference;
  displayedTime: ExpirationTime;
  dateInMilSeconds: number;

  constructor(protected platformService: PlatformService) {
    super();
  }

  ngOnInit() {
    this.dateInMilSeconds = Date.parse(this.element.date);
    this.timeDifference = new TimeDifference(this.dateInMilSeconds);

    if (!isNaN(this.dateInMilSeconds) && this.platformService.isBrowser()) {
      this.displayCountdown();
      let sub = Observable.interval(this.element.interval * 1000)
        .subscribe((x) => {
          this.displayCountdown();
        });

      this.detainedSubscriptions.push(sub);
    }
  }

  formatNumberToString(element: number): string {
    if (element <= 0) {
      return '00';
    }
    if (element < 10) {
      return '0' + element;
    }
    return '' + element;
  }

  displayCountdown() {
    let now = new Date();
    let nowUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    this.displayedTime = this.timeDifference.getOffset(nowUtc);
  }

}
