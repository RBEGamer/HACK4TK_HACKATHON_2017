import {Component, ElementRef, OnInit, ViewEncapsulation} from "@angular/core";
import {DynamicComponentAbstract} from "../../../abstracts/dynamic-component-abstract";
import {NavigationService} from "../../../services/navigation-service";
import {UserSettingsService} from "../../../services/user-settings.service";
import {RouterService} from "../../../services/router-service";

@Component({
  selector: 'main-navigation',
  templateUrl: 'main-navigation.component.html',
  styleUrls: ['main-navigation.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class MainNavigationComponent extends DynamicComponentAbstract implements OnInit {
  items;
  status = false;
  searchbarVisibleState = 'hidden';

  selectedNavigation;

  // @ViewChild('menu', {read: ViewContainerRef})
  // menuView: ViewContainerRef;

  menuVisible: boolean = false;
  submenuVisible: boolean = false;

  onClick(event: Event) {
    if (this.selectedNavigation && !this.elementRef.nativeElement.contains(event.target)) {
      this.selectedNavigation = null;
    }
  }

  showMenu() {
    this.menuVisible = !this.menuVisible
  }

  showSubmenu(item) {
    this.selectedNavigation = item;
    this.status = !this.status;
    this.submenuVisible = true;
  }

  hideSubmenu() {
    this.selectedNavigation = null;
    this.status = !this.status;
    this.submenuVisible = false;
  }

  toggleVisibility() {
    this.searchbarVisibleState = (this.searchbarVisibleState == 'hidden') ? 'visible' : 'hidden';
  }


  ngOnInit(): void {

    this.userSettingsService.getLanguage().switchMap(language => {
      return this.navigationService.getNavigation(language);
    })
      .map(items => items.page.childNodes)
      .subscribe(items => this.items = items);
  }

  constructor(protected navigationService: NavigationService,
              protected userSettingsService: UserSettingsService,
              protected elementRef: ElementRef,
              private routerService: RouterService) {
    super();
  }
}
