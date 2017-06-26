import {Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef} from "@angular/core";
import {ContentService} from "./services/content-service";
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from "@angular/router";
import {NavigationService} from "./services/navigation-service";
import {ContentRightComponent} from "./components/page/content-right/content-right.component";
import {UserSettingsService} from "./services/user-settings.service";
import {Language} from "./interfaces/language";
import {RouteData} from "./interfaces/route-data";
import {ConfigurationService} from "./services/configuration-service";
import {Subscription} from "rxjs";
import {PlatformService} from "../system/platform.service";
import {Meta, Title} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {BreadcrumbService} from "./services/breadcrumb-service";

@Component({
  selector: 'main-container',
  styleUrls: [
    '../../assets/styles/page/header.css',
    '../../assets/styles/page/footer.css',
  ],
  templateUrl: 'main.component.html'
})
export class MainComponent {
  @ViewChild('myNgIncludeContent', {read: ViewContainerRef})
  protected contentTarget: ViewContainerRef;

  cmpRef: ComponentRef<any>;
  navigationElements: any;
  selectedLanguage: Language;
  protected routeParams: any;
  protected routeData: RouteData;
  protected startpage: string;
  protected routerEventsSubscription: Subscription;


  constructor(protected meta: Meta,
              protected componentFactoryResolver: ComponentFactoryResolver,
              protected router: Router,
              protected activatedRoute: ActivatedRoute,
              protected contentService: ContentService,
              protected navigationService: NavigationService,
              protected userSettingsService: UserSettingsService,
              protected configurationService: ConfigurationService,
              protected breadcrumbService: BreadcrumbService,
              protected platformService: PlatformService,
              protected title: Title) {
  }

  userData: any;


  ngOnInit() {

    // this.setupSubscriptions();


    /* flow to create page:

     1. Get Language from UserSettings
     2. Find startpage from configuration
     3. Subscribe to routeParams and routeData
     4. Get Content according to routeParams

     ** routeData is not used right now.

     */
    this.userSettingsService.getLanguage()
      .switchMap((language) => {
        this.selectedLanguage = language;
        return this.configurationService.getStartpage();
      })
      .switchMap(startpage => {
        this.startpage = startpage;

        return this.activatedRoute.url;
      })
      .switchMap(segments => {
        return this.fetchContentByUrlSegments(segments);
      })
      .subscribe(page => {
        // update meta data
        if (page.body && page.body.metaDataList) {
          this.addMetadata(page.body.metaDataList)
        }

        // page Template Inclusion
        if (page.body && page.body.elements) {
          this.renderDynamicContent(page.body);
        }
        else {
          console.error('404 Not Found');
          this.renderLastResortPage('404 Not Found', 'Der redaktionelle Inhalt für diese Seite existiert nicht');
        }
      }, error => {
        console.error('Error rendering page. Invalid data retrieved', error);
        this.renderLastResortPage('500 Server Error', 'Rendering Error. Invalid Data Retrieved');
      }, () => {
        console.log('Initial Flow for Page building finished');
      });

    this.setupSubscriptions();
  }

  protected setupSubscriptions() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    if (this.platformService.isBrowser()) {
      // @PREVIEW

      // nothing right now
    }
  }

  addMetadata(metaDataList) {
    if (metaDataList && metaDataList.length > 0) {
      metaDataList.forEach(metaObject => {
        // console.log(metaObject);
        this.meta.addTag(metaObject);
      });
    }
  }


  protected fetchContentById(id: string, language: Language) {
    console.log('Fetching Content for', id, language);
    return this.contentService.getContentById(id + '_' + language.abbreviation.toLowerCase());
  }

  protected renderDynamicContent(page) {
    let component = this.resolveComponent(page.pageTemplate);
    this.breadcrumbService.setBreadcrumbValues(page.elements.breadcrumb);

    this.contentTarget.clear();

    let componentReference: any = this.contentTarget.createComponent(component);
    componentReference.instance.elements = page.elements;
    componentReference.instance.page = page;

    // TODO what happens if no title is set, just show the brandname?
    this.title.setTitle(page.title || '//@TODO if no title is provided');
  }

  resolveComponent(name: String): any {
    if ('ContentRight' == name || 'content-right' == name) {
      return this.componentFactoryResolver.resolveComponentFactory(ContentRightComponent);
    }
    // if ('OneColumn' == name) {
    //   return this.componentFactoryResolver.resolveComponentFactory(OneColumnComponent);
    // }
  }

  private fetchContentByPath(segments: UrlSegment[]): Observable<any> {
    let path = segments.map(segment => segment.path).join('/');
    console.log(path)

    return this.contentService.getContentByPath(path);

  }

  private fetchContentByUrlSegments(segments: UrlSegment[]): Observable<any> {
    if (segments.length == 1) {
      console.log('Fetching content by ID');
      let path = segments[0].path;
      if (path.startsWith('id:')) {
        path = path.substr(3)

        return this.fetchContentById(path, this.selectedLanguage)
      }
      else {
        console.log('Fetching content by Campaign_URL');
        return this.fetchContentByPath(segments);
      }
    }
    else if (segments.length > 1) {
      console.log('Fetching content by User Friendly URL');
      return this.fetchContentByPath(segments);
    }
    else {
      // If no contentId is given, we load the startpage
      console.log('No ContentId, fetching startpage', this.startpage);
      return this.contentService.getContentByPath(this.startpage);
    }
  }

  private renderLastResortPage(title: string, text: string) {

    //TODO last resort rendering, try to fetch content from configured 404 first.
    let notFound = {
      'id': 'DE_404',
      'pageTemplate': 'content-right',
      'title': title,
      'elements': {
        'content': [
          {
            'className': 'page-headline',
            'element': {
              'headline': title
            }
          }, {
            'className': 'standard-text',
            'element': {
              'dark': false,
              'bodyHtml': `<p>${text}</p>`
            }
          }]
      }
    };

    this.renderDynamicContent(notFound)
  }
}




