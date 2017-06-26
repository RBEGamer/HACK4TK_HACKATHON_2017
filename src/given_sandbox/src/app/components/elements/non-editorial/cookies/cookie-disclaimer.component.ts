import {Component, Inject, OnInit} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";
import {isNullOrUndefined} from "util";
import {EnvironmentService} from "../../../../services/environment-service";
import {DOCUMENT} from "@angular/platform-browser";

@Component({
  selector: 'ucp-cookie-disclaimer',
  templateUrl: 'cookie-disclaimer.component.html',
  styleUrls: ['cookie-disclaimer.component.css']
})

export class CookieDisclaimerComponent extends DynamicComponentAbstract implements OnInit {
  private label: string;

  // copied from encasa.de
  static COOKIE_NAME = 'cb-enabled';
  showCookieToolbar = false;

  constructor(@Inject(DOCUMENT) private document: any) {
    super();
  }


  ngOnInit(): void {
    if (EnvironmentService.isClientRendering()) {
      if (isNullOrUndefined(this.document.cookie) || this.document.cookie.length == 0 || this.getCookie(CookieDisclaimerComponent.COOKIE_NAME).length == 0) {
        this.showCookieToolbar = true;
      }
      else {
        this.showCookieToolbar = false;
      }
    }
  }

  acceptCookie() {
    this.setCookie(CookieDisclaimerComponent.COOKIE_NAME, "1", 365);
    this.showCookieToolbar = false;
  }

  /**
   * @see https://www.w3schools.com/js/js_cookies.asp
   * @param cname
   * @param cvalue
   * @param exdays
   */
  setCookie(cname: string, cvalue: string, exdays: number) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    this.document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


  /**
   * @see https://www.w3schools.com/js/js_cookies.asp
   * @param cname
   * @returns {any}
   */
  getCookie(cname: string) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
