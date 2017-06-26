import {ExpirationTime} from './expiration-time';

export class TimeDifference {
  private timeInMilSeconds

  constructor(element: number) {
    this.timeInMilSeconds = element;
  }

  /******
   * Calculate the difference between now and and the initiliazed time
   * @param number now The current time as Unix timestamp. It has to be smaller than the initialized time.
   * @return ExpirationTime If the initiliazed time is before the given parameter, each attribute will be 0.
   */
  public getOffset(now: number): ExpirationTime {
    let timeDifference = Math.floor((this.timeInMilSeconds - now) / 1000);
    if (timeDifference < 0) {
      return new ExpirationTime(0, 0, 0);
    }
    let days: number;
    let hours: number;
    let minutes: number;
    days = Math.floor(timeDifference / 86400);
    timeDifference -= days * 86400;
    hours = Math.floor(timeDifference / 3600) % 24;
    timeDifference -= hours * 3600;
    minutes = Math.floor(timeDifference / 60) % 60;
    timeDifference -= minutes * 60;
    return new ExpirationTime(days, hours, minutes);
  }
}
