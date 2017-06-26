import "zone.js/dist/zone";
import "reflect-metadata";

import {NgModule} from "@angular/core";
import {ApplicationComponent} from "./app/application.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserTransferStateModule} from "./system/transfer-state/browser-transfer-state.module";
import {AppCommonModule} from "./modules/common.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  bootstrap: [ApplicationComponent],
  imports: [
    AppCommonModule,
    BrowserModule.withServerTransition({
      appId: 'main'
    }),
    BrowserTransferStateModule,
    BrowserAnimationsModule
  ]
})
export class MainModule {
}

