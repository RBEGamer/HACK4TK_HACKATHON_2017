/**
 * Created by ameister on 20.02.2017.
 */
/*07.13 Sitemap */
import {Component} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../abstracts/dynamic-component-abstract";


@Component({
  selector: 'ucp-sitemap',
  templateUrl: 'sitemap.component.html',
  styleUrls: ['sitemap.component.css']
})
export class SitemapComponent extends DynamicComponentAbstract {

  element: any;
}
