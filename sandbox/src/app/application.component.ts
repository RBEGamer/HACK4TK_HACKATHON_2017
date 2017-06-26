import {Component, OnInit} from "@angular/core";
import {Cache} from "./services/cache-service";
import {ConfigurationService} from "./services/configuration-service";
import {PlatformService} from "../system/platform.service";

@Component({
  selector: 'ucp-application',
  template: `
    <router-outlet></router-outlet>`
})
export class ApplicationComponent implements OnInit {

  constructor(private cache: Cache,
              private configurationService: ConfigurationService,
              protected platformService: PlatformService) {
  }

  ngOnInit() {
    console.time('Rendering Time: ');
    console.log('application started');

    if (this.platformService.isServer()) {
      if (!this.configurationService.isMockEnabled() && !process.env.API_HOST) {
        console.error('No API_HOST set! Use mock or set host!');
        process.exit(-1);
      }
      this.cache.set('API_HOST', process.env.API_HOST);

      if (!!process.env.MOCK) {
        this.cache.set('MOCK', true);
      }

      // temporary handled constants to test REST CALLS on e.g. localhost
      if (process.env.TEST_API_HOST) {
        this.cache.set('TEST_API_HOST', process.env.TEST_API_HOST);
      }
      if (process.env.TEST_BY_PATH_STARTS_WITH) {
        this.cache.set('TEST_BY_PATH_STARTS_WITH', process.env.TEST_BY_PATH_STARTS_WITH);
      }
      if (process.env.TEST_WEB_SEAL_IV_USER) {
        this.cache.set('TEST_WEB_SEAL_IV_USER', process.env.TEST_WEB_SEAL_IV_USER);
      }

      console.log('set api-host to', process.env.API_HOST);

      this.configurationService.loadSettings().subscribe(document =>
        this.cache.set('settings', document.body)
      );
    }
    else {
      console.log('API-Host', this.cache.get('API_HOST'));
    }
  }

  ngAfterViewInit() {
    console.timeEnd('Rendering Time: ');
  }

  ngAfterViewChecked() {
    // console.log('ngAfterViewChecked')
  }
}
