import {Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {IntranetService} from "../../../../services/intranet-service";
import {InputField} from "../../../../Interfaces/input-field";
import {FormComponent} from "../../../../forms/form-component";
import {BookmarkService} from "../../../../services/bookmark-service";
import {Bookmark, BookmarkGroup} from "../../../../Interfaces/bookmark";

@Component({
  selector: 'ucp-bookmarks',
  templateUrl: 'bookmarks.component.html',
  styleUrls: ['bookmarks.component.css'],
})

export class BookmarksComponent extends FormComponent implements OnInit {
  public element: any;
  public bookmarkEntities = [];
  public editModus: boolean;
  public addModus: boolean;

  private bookmarkGroupEntity: BookmarkGroup;
  public bookmarksForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private bookmarkService: BookmarkService) {
    super();
  }


  /**
   * Read all user-defined bookmarks and build the form.
   */
  ngOnInit(): any {
    this.editModus = false;
    this.addModus = false;
    this.bookmarksForm = this.formBuilder.group({});

    this.initEntitiesAndForm();
  }

  initEntitiesAndForm() {
    console.log("initEntitiesAndForm");
    this.bookmarkService.getBookmarkGroup(this.element.bookmarkGroup.name).subscribe((data) => {
      if (data && data.id) {
        this.bookmarkGroupEntity = data;
        console.log("Read group", JSON.stringify(this.bookmarkGroupEntity));

        if (this.bookmarkGroupEntity.bookmarks) {
          this.buildForm(this.bookmarkGroupEntity.bookmarks);
        }
      }

    },(error) => {
      this.bookmarkGroupEntity = this.bookmarkService.newBookmarkGroup(this.element.bookmarkGroup.name);
      console.log("New group ", JSON.stringify(this.bookmarkGroupEntity));
    });
  }

  buildForm(userBookmarks: any, createForm?: boolean) {

    this.bookmarkEntities.forEach(element => {
      this.bookmarksForm.removeControl(element.id);
    });
    this.bookmarkEntities = [];

    for (var i = 0; i <= userBookmarks.length - 1; i++) {
      this.bookmarksForm.addControl(userBookmarks[i].id, new FormControl(''));
      this.bookmarkEntities.push(userBookmarks[i]);
    }
  }


  switchToEditModus() {
    this.editModus = true;
  }

  switchToAddModus() {
    this.addModus = true;
  }

  onAddCancel() {
    this.addModus = false;
  }

  onAdd() {
    this.addModus = false;

    let newBookmark: Bookmark = new Bookmark(this.bookmarksForm.controls["name"].value, this.bookmarksForm.controls["url"].value);

    this.bookmarkService.addBookmark(this.bookmarkGroupEntity, newBookmark).subscribe((data) => {
      this.bookmarkGroupEntity = data;
      console.log("Added new bookmark", JSON.stringify(this.bookmarkGroupEntity));
      this.initEntitiesAndForm();


      if (this.bookmarkGroupEntity && this.bookmarkGroupEntity.bookmarks) {
        this.buildForm(this.bookmarkGroupEntity.bookmarks);
      }
    })
  }

  onEditCancel() {
    this.editModus = false;
  }

  onDelete() {
    this.editModus = false;

    let bookmarksToDelete = this.bookmarkEntities.filter(element => {
      return (<FormControl>this.bookmarksForm.controls[element.id]).value;
    });

    bookmarksToDelete.forEach(element => {
      this.bookmarkService.deleteBookmark(this.bookmarkGroupEntity, element);
      this.bookmarksForm.removeControl(element.id);
      this.removeArrayElement(<[any]>this.bookmarkEntities, element);
    });

  }


  onSave() {
    this.editModus = false;
  }

}
