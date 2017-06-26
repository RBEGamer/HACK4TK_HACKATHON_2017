import "polyfills";
import "zone.js/dist/zone";
import "reflect-metadata";
import "rxjs/Observable";
import "rxjs/add/operator/map";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {MainModule} from "./main.browser";
import {enableProdMode} from "@angular/core";


enableProdMode();

document.addEventListener("DOMContentLoaded", function (event) {
  let moduleRef = platformBrowserDynamic().bootstrapModule(MainModule);
});

