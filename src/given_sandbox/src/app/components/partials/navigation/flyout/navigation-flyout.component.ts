import {Component, ElementRef, Input, ViewEncapsulation} from "@angular/core";
import {UserSettingsService} from "../../../../services/user-settings.service";
import {Language} from "../../../../interfaces/language";
import {RouterService} from "../../../../services/router-service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'navigation-flyout',
  templateUrl: 'navigation-flyout.component.html',
  styleUrls: ['navigation-flyout.css'],
  encapsulation: ViewEncapsulation.None,

  animations: [
    trigger('unfold', [
      state('void', style({
        // opacity: 0,
        height: 0
      })),
      state('*', style({
        // opacity: 1,
        height: '*'
      })),
      transition('* <=> void', animate('300ms ease-in-out'))
      // ,
      // transition('* => void', [
      //   style({height: '*'}),
      //   animate(1000, style({height: 0}))
      // ]), transition('void => *', [
      //   style({height: '0'}),
      //   animate(1000, style({height: '*'}))
      // ])
    ])
  ]
})
export class NavigationFlyoutComponent {
  @Input() subNavigation;
  @Input() state = false;

  query: string;

  private currentLanguage: Language;
  private filterItems: any;


  constructor(private userSettings: UserSettingsService,
              private routerService: RouterService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.userSettings.getLanguage().subscribe(language => this.currentLanguage = language)
    if (this.subNavigation) {
      this.filterItems = this.subNavigation.childNodes;
    }
    //
    // console.log(this.editorialContent)
  }

  ngOnChanges(oldValue: any) {
    if (this.subNavigation) {
      this.filterItems = this.subNavigation.childNodes;
    }
  }

  onChange() {
    if (this.query && this.query.length > 2) {
      this.filterItems = this.subNavigation.childNodes.filter(value => {
        return value.title && value.title.toLowerCase().indexOf(this.query.toLowerCase()) >= 0
      });
    }
    else {
      this.filterItems = this.subNavigation.childNodes;
    }
  }

}
