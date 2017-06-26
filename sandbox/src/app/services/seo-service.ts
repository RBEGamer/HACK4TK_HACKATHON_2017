import {Injectable, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/platform-browser";
// import {SeoMetaData} from "./../../model/seo-meta-data";

@Injectable()
export class SEOService {
  constructor(@Inject(DOCUMENT) private document: any) {
  }

  // public setData(metaData: SeoMetaData): void {
  //   this.setMeta(metaData.title,metaData.description);
  // }
  public setMeta(title: string = '', description: string = '') {
    this.setTitle(title);
    this.setMetaDescription(description);
  }

  private setTitle(title: string) {
    this.document.title = title;
  }

  private setMetaDescription(description: string) {
    let headChildren = this.document.head.children;
    for (let i = 0; i < headChildren.length; i++) {
      let element: any = headChildren[i];

      if (element.name === 'meta' && element.attribs.name === 'description') {
        element.attribs.content = description;
      }
    }
  }
}
