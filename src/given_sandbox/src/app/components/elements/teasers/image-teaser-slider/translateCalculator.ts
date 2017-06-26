/**
 * Created by bburczek on 27.04.2017.
 */

import {animate, keyframes, state, style, transition, trigger} from "@angular/animations"

export class TranslateCalculator {
  public static translateTest = 'translateX(-300px)';
}

export function goNext() {
  return trigger('movePanel', [
    transition('back => for',  animate('700ms', style({transform: 'translate3d(-100%, 0, 0)'}))),
    transition('for => back',  animate('700ms', style({transform: 'translate3d(100%, 0, 0)'})))
  ])
}
