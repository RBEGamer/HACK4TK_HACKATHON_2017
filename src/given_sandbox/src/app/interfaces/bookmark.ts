/**
 * Created by fklein-robbenhaar on 31.03.2017.
 */

export class BookmarkGroup {
  id?: string;
  name: string;
  bookmarks?: [Bookmark];
}

export class Bookmark {

  id?: string;
  name: string;
  url: string;


  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}
