/*14.06 Appearing-Teaser*/
import {Component, HostListener, OnInit} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";


@Component({
  selector: 'appearing-teaser',
  templateUrl: 'appearing-teaser.component.html',
  styleUrls: ['appearing-teaser.component.css'],
  animations: [
    trigger('scrollState', [
      state('top', style({
        transform: 'translateX(+100%)'
      })),
      state('below', style({
        transform: 'translateX(0)'
      })),
      transition('top <=> below', animate(500))
    ])
  ]
})

export class AppearingTeaserComponent extends DynamicComponentAbstract implements OnInit {
  scrollState: string;
  closeButtonClicked: boolean;

  ngOnInit() {
    this.scrollState = "top";
    this.closeButtonClicked = false;
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    if (!this.closeButtonClicked) {
      if (window.pageYOffset > 20) {
        this.scrollState = 'below';
      }
      else {
        this.scrollState = 'top';
      }
    }
  }

  closeButtonAction() {
    this.closeButtonClicked = true;
    this.scrollState = 'top';
  }


}
