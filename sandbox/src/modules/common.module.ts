import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {TransferHttpModule} from "../system/transfer-http/transfer-http.module";
import {MainComponent} from "../app/main.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgPipesModule} from "ngx-pipes";
import {UcpProvidersModule} from "./ucp-providers.module";
import {ApplicationComponent} from "../app/application.component";
import {UCP_EDITORIAL_COMPONENTS} from "../component-management/editorial-components.const";
import {UCP_DIRECTIVES} from "../component-management/directives.const";
import {LightboxModule} from "./lightbox/lightbox.module";
import {UcpSliderComponent} from "../app/components/slider/templateSlider.component";


@NgModule({
  imports: [
    CommonModule,
    UcpProvidersModule,
    HttpModule,
    TransferHttpModule,
    ReactiveFormsModule,
    FormsModule,

    NgPipesModule,
    LightboxModule,
    RouterModule.forRoot([
      {
        path: ':language/:contentId',
        component: MainComponent
      },
      {
        path: ':contentId',
        component: MainComponent,
        data: {language: false}
      }, {
        path: '',
        component: MainComponent,
        data: {language: false, index: true}
      },
      {
        path: '**',
        component: MainComponent,
        data: {emptyRedirect: true}
      }
    ]),
  ],
  entryComponents: UCP_EDITORIAL_COMPONENTS,
  exports: [RouterModule, MainComponent],
  declarations: UCP_EDITORIAL_COMPONENTS.concat([
    MainComponent,
    ApplicationComponent,
    UcpSliderComponent
  ], UCP_DIRECTIVES),
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppCommonModule {
}

