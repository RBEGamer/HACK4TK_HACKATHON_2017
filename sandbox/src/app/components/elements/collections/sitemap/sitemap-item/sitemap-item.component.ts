import {Component, Input} from "@angular/core";
import {DynamicComponentAbstract} from "../../../../../abstracts/dynamic-component-abstract";


@Component({
  selector: 'ucp-sitemap-item',
  templateUrl: 'sitemap-item.component.html',
  styleUrls: ['sitemap-item.component.css']
})
export class SitemapItemComponent extends DynamicComponentAbstract {
  @Input() link: any;
  @Input() linkList: any;

}
