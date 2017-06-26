import "zone.js";
import "reflect-metadata";

import {NgModule, APP_BOOTSTRAP_LISTENER, ApplicationRef} from "@angular/core";
import {ApplicationComponent} from "./app/application.component";
import {ServerModule} from "@angular/platform-server";
import {BrowserModule} from "@angular/platform-browser";
import {ServerTransferStateModule} from "./system/transfer-state/server-transfer-state.module";
import {AppCommonModule} from "./modules/common.module";
import {TransferState} from "./system/transfer-state/transfer-state";


export function onBootstrap(appRef: ApplicationRef, transferState: TransferState) {
  return () => {
    appRef.isStable
      .filter(stable => stable)
      .first()
      .subscribe(() => {
        transferState.inject();
      });
  };
}

@NgModule({
  bootstrap: [ApplicationComponent],

  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: onBootstrap,
      multi: true,
      deps: [
        ApplicationRef,
        TransferState
      ]
    }
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'main',
    }),
    ServerModule,
    ServerTransferStateModule,
    AppCommonModule
  ]

})
export class MainServerModule {

  constructor(private transferState: TransferState) {
  }

  ngOnBootstrap = () => {
    this.transferState.inject();
  }

}
declare var Zone: any;
export function getRequest() {
  return Zone.current.get('req') || {};
}
export function getResponse() {
  return Zone.current.get('res') || {};
}
