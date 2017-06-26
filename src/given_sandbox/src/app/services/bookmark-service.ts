import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {HttpService} from "./http-service";
import {Bookmark, BookmarkGroup} from "../Interfaces/bookmark";


//  List all groups of Bookmarks of the current user
//  GET http://localhost:4000/api/data/bookmarkgroups
//  Add a group of the current user
//  POST http://localhost:4000/api/data/bookmarkgroups
//  Delete a group of the current user
//  DELETE http://localhost:4000/api/data/bookmarkgroups
const BOOKMARK_GROUPS = "api/data/bookmarkgroups";

//  List all bookmarks of a specific group of the current user
//  GET http://localhost:4000/api/data/bookmarkgroups/<groupId>/bookmarks
//  Add
//  POST http://localhost:4000/api/data/bookmarkgroups/<groupId>/bookmarks
//  Edit
//  PUT http://localhost:4000/api/data/bookmarkgroups/<groupId>/bookmarks/<id>
//  Delete bookmarks
//  PUT http://localhost:4000/api/data/bookmarkgroups/<groupId>/bookmarks/<id>
const BOOKMARKS = "bookmarks";

const PREFIX_CACHE_KEY = "INTRANET_";

@Injectable()
export class BookmarkService {

  constructor(protected httpService: HttpService) {
  }

  newBookmarkGroup(groupName: string): BookmarkGroup {
    let group: BookmarkGroup = new BookmarkGroup();
    group.name = groupName;
    return group;
  }


  getBookmarkGroup(groupName: string): Observable<BookmarkGroup> {
    let bookmarkGroup;
    return this.httpService.performApiGetRequest(BOOKMARK_GROUPS + '?name=' + groupName)
      .map(response => response.body)
      .flatMap(result => {
        if (!result) {
          return Observable.throw('No bookmarkgroup found');
        }

        bookmarkGroup = result[0];
        let target = this.getBookmarksURL(bookmarkGroup.id);
        return this.httpService.performApiGetRequest(target);
      })
      .map(response => response.body)
      .flatMap(result => {

        bookmarkGroup["bookmarks"] = result;
        return Observable.of(bookmarkGroup);
      });
  }


  addBookmark(bookmarkGroup: BookmarkGroup, bookmark: Bookmark): Observable<BookmarkGroup> {
    if (!bookmarkGroup || !bookmarkGroup.id) {
      return this.httpService.performApiPostRequest(BOOKMARK_GROUPS, bookmarkGroup)
        .map(response => response.body)
       .flatMap((bookmarkGroup) => {
          console.log("Created Bookmarkgroup ", JSON.stringify(bookmarkGroup));
          let target = this.getBookmarksURL((<BookmarkGroup>bookmarkGroup).id);
          console.log("Create Bookmark ", JSON.stringify(bookmark));
          return this.httpService.performApiPostRequest(target, bookmark).toPromise();
        }).map(data => data.body)
    }
    else {
      let target = this.getBookmarksURL(bookmarkGroup.id);

      return this.httpService.performApiPostRequest(target, bookmark)
        .map((data) => data.body);
    }
  }

  deleteBookmark(bookmarkGroup: BookmarkGroup, bookmark: Bookmark) {
    if (bookmark && bookmark.id && bookmarkGroup && bookmarkGroup.id) {
      let path = this.getBookmarksURL(bookmarkGroup.id) + "/" + bookmark.id;
      this.httpService.performApiDeleteRequest(path).subscribe(response => {

        return response.body;
      });
    }
  }

  private getBookmarksURL(groupId: string): string {
    return BOOKMARK_GROUPS + "/" + groupId + "/" + BOOKMARKS;
  }


}
