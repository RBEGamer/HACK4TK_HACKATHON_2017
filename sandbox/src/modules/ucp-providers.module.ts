import {NgModule} from "@angular/core";
import {DynamicContentService} from "../app/services/dynamic-content.service";
import {UserSettingsService} from "../app/services/user-settings.service";
import {ConfigurationService} from "../app/services/configuration-service";
import {HttpService} from "../app/services/http-service";
import {Title} from "@angular/platform-browser";
import {UrlResolverService} from "../app/services/url-resolver-service";
import {SEOService} from "../app/services/seo-service";
import {RouterService} from "../app/services/router-service";
import {ElementService} from "../app/services/element-service";
import {Cache} from "../app/services/cache-service";
import {PlatformService} from "../system/platform.service";
import {DYNAMIC_PROVIDERS} from "../component-management/dynamic-providers.const";
import {BookmarkService} from "../app/services/bookmark-service";
import {WorkflowService} from "../app/services/workflow-service";
import {WindowRefService} from "../app/services/window-ref.service";
import {DataFinderService} from "../app/services/data-finder-service";
import {BreadcrumbService} from "../app/services/breadcrumb-service";



@NgModule({
  providers: [
    DynamicContentService,
    ElementService,
    ConfigurationService,
    BreadcrumbService,
    RouterService,
    SEOService,
    UrlResolverService,
    Cache,
    UserSettingsService,
    HttpService,
    Title,
    PlatformService,
    BookmarkService,
    WorkflowService,
    WindowRefService,
    DataFinderService,
    DYNAMIC_PROVIDERS
  ],
})
export class UcpProvidersModule {
}
